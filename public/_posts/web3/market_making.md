---
title: Designing a Market-Making Algorithm for IOTA/BTC: A Predictive and Risk-Aware Approach
excerpt: Explore how I designed a market-making algorithm for the IOTA/BTC pair on Binance.
coverImage: posts/market_making/cover.jpeg  
date: February 6, 2025  
---
# Introduction

In this post i look into the key concepts of designing a market-making algorithm. The algorithm is intended to efficiently manage liquidity provision in a trading environment. The approach taken uses a combination of predictive analysis and risk management. The design and analysis of this market-making algorithm, uses a provided dataset of order book and trade data ([Binance IOTA/BTC Spot Market](https://www.binance.com/en/trade/IOTA_BTC?type=spot)) for the IOTA - BTC token couple from July 17, 2020, to July 30, 2020.  

## What is Market-Making and Why is it Important?

At its core, a Market Maker (MM) plays a vital role in financial markets by providing **liquidity**. This involves quoting buy (bid) and sell (ask) prices for an asset and profiting from the spread, i.e., the difference between the bid and ask prices. A successful market maker must balance several factors:
*   **Providing liquidity** by posting buy and sell orders at various price levels.
*   **Managing risk** to avoid losses from unfilled orders.
*   **Generating profit** from the bid-ask spread.

The paper aims to design a market maker that provides quotes around a **predictive fair value** for an asset. The market maker places Limit Orders (LOs) on the Limit Order Book (LOB) at strategic distances from the current mid-price to maximize profits while managing the likelihood of their orders being executed. The model assumes a risk-neutral trader with costless inventory management and infinite patience.

## Key Components of the Algorithm

The document outlines several key components of the market-making algorithm:

*   **Rationale**: The paper explains the reasoning behind the algorithm's design, highlighting its applicability and advantages in the given market context.
*   **Mathematical foundation**: It establishes the mathematical framework and key assumptions underlying the algorithm.
*   **Data processing**: The paper describes how the algorithm processes order book and trade data to generate quotes dynamically.
*   **Risk evaluation**: The paper considers potential risks and limitations of the approach, along with possible mitigation strategies.
*  **Expected behavior**: The paper details the expected behavior and output of the algorithm under various market conditions.

## Fair Price Prediction

The algorithm first needs to determine the **fair price** of the asset. Two methods are explored for estimating the fair price in real-time trading:

*   **Mid-Price:** The average of the best bid and ask prices. While it reflects the center of market activity, it can be unreliable in thin or volatile markets.
*   **Weighted Mid-Price:** This method weights the best bid and ask prices by the available depth (size) at each level, adjusting for order book imbalances. The weighted mid-price provides a fairer estimate in uneven markets.

The paper uses the **Weighted Mid-Price approach**, since if the market were perfectly balanced, it would converge to the mid-price estimate.

## Optimal Quotes and the Bid-Ask Spread

The paper acknowledges that **market makers require a bid-ask spread to remain viable**. This is due to the imbalances between buy and sell orders. The bid-ask spread is a vital condition for a market maker to remain viable.
The algorithm continuously adjusts quotes based on incoming market data and its estimation of the predictive fair value. The MM seeks to maximize cash at a terminal time T, while also restricting its inventory within specified bounds. The optimal strategy for the MM is to post in the LOB, maximizing the probability of the LOs being filled.

## Implementation

In this paper I simulate the process of generating bid and ask quotes. The spread from the fair price is defined as 
```math
\delta \pm = \pm c \cdot \Delta_t \pm
```
Where $c \in [0,1] $ is a constant, and $\Delta_t \pm$  are the observed best ask/bid prices from the orderbook at time t.
The model uses a fixed proportion of the observed bid/ask spread in the order book and does not dynamically adapt to changes in volatility, liquidity, or market conditions. This approach may not be robust enough in volatile or fast-moving conditions.

## Results

My results show that the difference between the calculated fair price and the actual trade price remains below 1.02% for all market events, indicating the fair price is a good approximation. I also highlight how an ideal MM should continuously adapt its strategy to prevailing market conditions, adjusting spreads and managing inventory based on market trends and volatility.
Indeed my implementation does have several limitations:
* **Unrealistic Assumptions**: The model assumes infinite patience, no trading costs, and risk neutrality.
* **Market Conditions**: The model assumes that other market makers’ actions are independent and that market orders follow a simple, predictable distribution.
* **Predictive Fair Value Accuracy**: The quality of the quotes depends on the accuracy of the predictive fair value.


## Reflection on Machine Learning

I also reflect on the potential use of machine learning (ML) techniques, such as Long Short-Term Memory (LSTM) models, to simulate market dynamics and train a reinforcement learning (RL) strategy for market making. 
If you are interested in this topic you might want to take a look to my GitHub repo where I am currently exploring this opportunity:

[LSTM2RL-SynthCyptoMarketMaker](https://github.com/luca-nik/LSTM2RL-SynthCryptoMarketMaker) 


## Conclusion

This paper provides a systematic approach to market-making, integrating theoretical insights with practical data analysis. While it has its limitations, it offers a strong foundation for understanding the complexities of automated market-making and highlights areas for future research and refinement.

---

*Read the full document here:*

<iframe src="../../_documents/MarketMaking.pdf" width="100%" height="600px"></iframe>

The Github repository containing all the original codes to produce this anaylsis can be found at:

[market-making-algorithm](https://github.com/luca-nik/market-making-algorithm)

---

Stay tuned ...
