---
title: MEV Agents and the Forward Routing Problems
excerpt: My DeFi automatic bot that maximizes the order's surplus by matching a set of order intents to various potential liquidity sources.
coverImage: /posts/forward-routing/mev_agent.png
date: October 5, 2024
---
---


## MEV Agents: Optimizing DeFi Trades

In decentralized finance (DeFi), Maximum Extractable Value (MEV) agents have emerged as a crucial tool for traders looking to optimize their execution. These agents actively analyze real-time transaction data, detecting peer-to-peer matches and profitable ring trades that unlock the best prices for trades or limit orders. By considering factors like liquidity, order book depth, and price slippage, MEV agents ensure that traders achieve the most efficient execution possible.

Whether interacting directly with on-chain automated market makers (AMMs) or leveraging decentralized exchange (DEX) aggregators, MEV agents continuously assess and route transactions through the most advantageous paths, making them an integral part of modern DeFi ecosystems.

<br>

In this post, I'll guide youu thorugh the development of a MEV agent that can match a set of order intents (in `JSON`) to various potential liquidity sources and determine the optimal execution to maximize the order's surplus.

For instance, here is a simple example of an order intent:


<div align="center">
  <img src="/_images/posts/forward-routing/intent1.png" style="width: 70%; height: 70%;">
</div>

<br>


---

### Setting the Framework

<br>

Suppose a user with an order expressing their intent to buy `buy_token` and sell `sell_token` with specified restrictions. These restrictions include the maximum amount of `sell_token` the user is willing to sell (`s_lim`) and the minimum amount of `buy_token` the user is willing to receive (`b_lim`).

We have a set of venues or liquidity pools with an AMM where coins can be swapped. All the coins and venues define an undirected graph, with the former being the vertices and the latter being the edges. For example:

<br>

<div align="center">
  <img src="/_images/posts/forward-routing/undirected_graph.png?raw=true" style="width: 60%" class=blogpost-image>
</div>

<br>

The order's surplus `Γ` is defined as:

<br>

<div align="center">
  <img src="/_images/posts/forward-routing/surplus.png?raw=true" style="width: 20%;">
</div>

<br>


Where `π = s_lim / b_lim` is the user's worst acceptable exchange rate.


<br>

<strong>The problem posed is: if users has `1000 MU` (`sell_token`), what is the optimal way to convert it into `NU` (`buy_token`)? These problems are called forward routing.  </strong>

<br>


Interestingly, for such problems, direct routes (i.e., selling all `1000 MU` along a single simple path connecting `MU` to `N`U), are not always the most efficient, and a combination of multiple routes can often yield better results.

Thus, the task translates into helping the user solve this problem:

<br>

<div align="center">
  <img src="/_images/posts/forward-routing/Equation_maximization.png" style="width: 50%;">
</div>

<br>

With `N` being the number of simple paths connecting `sell_token` with `buy_token` (`MU` and `NU` in our example, respectively).

<br>

<div align="center">
  <img src="/_images/posts/forward-routing/confused_user_no_paths.png" style="width: 60%;">
</div>

<br>

Gladly, the **<a href="https://hal.science/hal-03455981/file/goroen.pdf" target="_blank">forward routing problem is convex</a>**, so we do not have to embark on a global optimization problem but can employ local minimizers.


<br>

---

### My Approach


<br>

There are many ways to solve this problem. In my solution, the main components are a set of classes:

-   `Order`: Represents an order with user intent for trading.
-   `Venue`: Represents a trading venue with token reserves.
-   `Market`: Represents a market of trading venues; it is a graph with tokens at the vertices and venues at the edges.
-   `Agent`: Represents a market agent that formulates and optimizes trading strategies.

<br>

Given a generic `intent`, with the user  `Order` and the list of `Venues` forming a `Market` graph, `Agent`  reads the `Market`  and constructs a  `strategy`  to fulfill the user's swap needs.

In this case, `strategy` is a directed subgraph of `Market` containing all the simple paths connecting the user requested `sell_token` to `buy_token`. 

The  `Agent`  now searches for the optimal coin exchange among the paths in the `strategy` to maximize the user surplus by applying a constrained maximization of the order's surplus  `Γ`  function defined above.


This is the scheme of such an approach:

<br>

<div align="center">
  <img src="/_images/posts/forward-routing/scheme.png?raw=true" style="width: 100%;">
</div>

<br>

Which translates into this code:


<div align="center">
  <img src="/_images/posts/forward-routing/main_mev.png?raw=true" style="width: 80%;">
</div>

<br>

One can call such function with a simple Python program:

<div align="center">
  <img src="/_images/posts/forward-routing/mev_optimization.py.png?raw=true" style="width: 80%;">
</div>

<br>

That when is run for the previous intent outputs:

<div align="center">
  <img src="/_images/posts/forward-routing/shell_run.png?raw=true" style="width: 80%;">
</div>

<br>

Generating the following results:


<div align="center">
  <img src="/_images/posts/forward-routing/intent1_output.png?raw=true" style="width: 70%;">
</div>

<br>

That's enough to make it work. 

However, If you want more technical details on how such code works, sit down and fasten your belt.

<br>

---

### Technical Discussion

<br>


In this first steps, we build: 
1. The user `Order`  containing the intent of buying  `buy_token`  and selling  `sell_token`, with the worst acceptable exchange rate;
2. The `Venue` objects containing the trading venues;
3. The `Market` object, i.e., the graph of coins and trading venues.

<br>

<div align="center">
  <img src="/_images/posts/forward-routing/snippet_variables_preparation.png?raw=true" style="width: 70%;">
</div>

<br>


---

<br>

#### The User Order's

First of all, we ingest the intent into the variable data and read values from it:

<div align="center">
  <img src="/_images/posts/forward-routing/order_creation.png?raw=true" style="width: 80%;">
</div>

<br>

This allows to initialize an instance of the class `order`:


<div align="center">
  <img src="/_images/posts/forward-routing/order.png?raw=true" style="width: 80%;">
</div>

<br>

<br>

----

<br>

#### The Venues


Next, we include all the venues:


<div align="center">
  <img src="/_images/posts/forward-routing/venue_creation.png?raw=true" style="width: 70%;">
</div>

<br>


This allows to initialize a list of instances of the class `venue`:


<div align="center">
  <img src="/_images/posts/forward-routing/venue.png?raw=true" style="width: 70%;">
</div>

<br>

<br>

----

<br>

#### The Market 

 
Having stored the venues, we can now build the `Market` graph:


<div align="center">
  <img src="/_images/posts/forward-routing/market.png?raw=true" style="width: 70%;">
</div>

<br>

The initialization of a `market` instance generates the graph as follows:


<div align="center">
  <img src="/_images/posts/forward-routing/generate_market_graph.png?raw=true" style="width: 70%;">
</div>

<br>

In our example, `Market` will look something like:

<br>

<div align="center">
  <img src="/_images/posts/forward-routing/market_example_2_coins.png?raw=true" style="width: 30%;">
</div>

<br>

<br>

---

<br>

#### The Agent


Now, that we have all the necessary inputs, we can initialize the `Agent` and construct the `strategy` graph:

<div align="center">
  <img src="/_images/posts/forward-routing/snippet_agent_preparation.png?raw=true" style="width: 60%;">
</div>

<br>


Where the `Agent` object looks like:

<div align="center">
  <img src="/_images/posts/forward-routing/Agent.png?raw=true" style="width: 70%;">
</div>

<br>
<br>


---

<br>

#### Strategy Construction

<br>

`Strategy` is a directed subgraph of `Market`. `Agent`, stores also all the paths connecting `sell_token` to `buy_token`. In our case, this will look something like:


<div align="center">
  <img src="/_images/posts/forward-routing/strategy_2_coins.png?raw=true" style="width: 30%;">
</div>

<br>


In case of more complex graphs, multiple paths are stored for future propagation and optimization, for example:

<div align="center">
  <img src="/_images/posts/forward-routing/strategy_and_paths_for_code.png?raw=true" style="width: 70%;">
</div>

<br>


To do this, we first read the `Market` with the method:

<div align="center">
  <img src="/_images/posts/forward-routing/read_market.png?raw=true" style="width: 70%;">
</div>

<br>


And then, we construct the strategy multigraph:


<div align="center">
  <img src="/_images/posts/forward-routing/make_strategy.png?raw=true" style="width: 70%;">
</div>

<br>

<br>

----

<br>

#### The Strategy Optimization

<br>

Now we have all the ingredients to try to solve our *forward routing problem*:

1. We have the intents of the user defining the constraint of our problem;
2. We have the paths along which we can propagate to reach `buy_token` from `sell_token`;
3. Having set the direction of propagation, we also have the price function for each edge, allowing swapping from one coin to another through an AMM venue.

<br>


Note: the price function of the venue  `AMM C-A`  will be in an AMM:


<br>

<div align="center">
  <img src="/_images/posts/forward-routing/price_function.png?raw=true" style="width: 30%;">
</div>

<br>


Where `a` is the amount of coin `A` sold to buy the amount `c` of coin `C`.  `[A], [C]`  are the initial liquidities of the tokens.

Now we can use the `optimize_strategy` method bound to `Agent`:


<div align="center">
  <img src="/_images/posts/forward-routing/optimize_strategy.png?raw=true" style="width: 70%;">
</div>

<br>


In this routine, we make use of the propagate along (path) which is defined as:

<div align="center">
  <img src="/_images/posts/forward-routing/propagate_along.png?raw=true" style="width: 70%;">
</div>

<br>


And that's all.

Now we have obtained the optimal amount of coins sold and bought through each channel, we just need to output the results to the user.

<br>

---

## Final Thoughts

<br>

The approach I employed works on acyclic graphs. Adding an edge between two coins makes the graph become a multigraph. From a theoretical point of view, the problem of **routing** on multigraphs is still convex (e.g., see **<a href="https://hal.science/hal-03455981/file/goroen.pdf">this reference</a>**). 

The code works fine for very simple multigraphs (i.e., only two coins are connected by more than one venue).
However, when multiple venues connect multiple coins, the problem of detecting all simple paths connecting `sell_token` to `buy_token` arises. This problem is combinatorial by nature and gets extremely complex as the graph's dimensions increase.

In addition to this, even if the directed graph wouldn't have multi-edged connected vertices, the problem of simple path detection from `A` to `B` is highly complex (**<a href="https://epubs.siam.org/doi/abs/10.1137/0208032" target="_blank">#P-complete</a>**), and requires **<a href="https://arxiv.org/pdf/2103.06102" target="_blank">complex numerical techniques</a>** to be solved efficiently.

Moreover, I never considered multi-asset venues, which would imply more complex graphs and for which the price functions could change during propagation. Indeed, if I consider a multi-asset pool, with tokens `A`, `B`, and `C`, it can happen that the price function `c(a)` might change if I first visited this venue but along a different edge of the graph (e.g., `A`/`B`).  

Another source of additional complexity is the possibility that the graph changes through time. Indeed, it might be possible for new venues to be added to the market, introducing new connections among the nodes.

Eventually, I did not consider that in real swaps, liquidity pool providers' fees, venues' price functions, and price slippage, among other factors, might influence the executed outcome.

<br>

---

## Until Next Time, Anon

<br>

The real world is much more complex than this challenge, but this was a fun start. By the way, if you like what you learned today, you can try it yourself: <strong><a href="https://github.com/luca-nik/mev_agent" target="_blank">here is the repository for my project</a></strong>.


See you soon...