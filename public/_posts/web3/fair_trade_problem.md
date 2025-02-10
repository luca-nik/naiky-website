---
title: The Fair Exchange Problem: A Mathematical Perspective  
excerpt: A deep dive into the fair exchange problem and its implications, with Ethereum's PBS as an illustrative example.  
coverImage: /posts/fair_trade_problem/cover.png  
date: Februray 10, 2025
---
---

## Introduction

Fair exchange is a fundamental problem in distributed systems and game theory that arises when two or more parties wish to exchange assets without trusting each other. This challenge has profound implications for modern blockchain systems, particularly in Ethereum's **Proposer-Builder Separation (PBS)**, where relays act as intermediaries between block proposers and builders. In this article, I will:
1. Formally define the Fair Exchange Problem
2. Prove its impossibility in asynchronous systems (Cleve's Theorem)
3. Examine its practical implications in Ethereum's PBS

## The Fair Exchange Problem

### 1. Mathematical Definition

Consider two parties, $A$ and $B$, each possessing an asset they wish to exchange through a protocol $P$. Each party wants to ensure they receive the other's asset in exchange for their own, without relying on a trusted third party (TTP).

##### Variable Definitions

- $p \in \{A,B\}$: Parties in the exchange
- $-p$: Counterparty to $p$ (if $p = A$, then $-p = B$)
- $\alpha_p$: Asset owned by party $p$
- $\alpha_{-p}$: Asset owned by the counterparty of $p$
- $\sigma_p^i$: Local state of party $p$ at round $i$
- $\sigma_p^n$: Final state of party $p$ after $n$ rounds
- $Out_p(\sigma_p^n)$: Outcome for party $p$ at the end of the protocol
  - First component: $\{0,1\}$ (success/failure)
  - Second component: $\{\alpha_{-p}, \bot\}$ (received asset or null state)
- $\bot$: Null state representing protocol failure or no asset received
- $\mathcal{A}$: Adversarial strategy
- $\lambda$: Security parameter
- $\varepsilon(\lambda)$: Negligible function of the security parameter

#### 1.1 Protocol Model

Let's formally define the components of an exchange protocol $P$:

- **Assets**: Each party $p \in \{A,B\}$ has an asset $\alpha_p \in \mathcal{X}_p$, where $\mathcal{X}_p$ is the space of possible assets for party $p$

- **Local State**: Each party maintains a local state $\sigma_p \in \Sigma_p$, where $\Sigma_p$ is party $p$'s state space

- **Protocol Execution**:
  1. **Initialization**: 
  ```math
  Init_p: \mathcal{X}_p \to \Sigma_p
  ```
  generates the initial state $\sigma_p^0 = Init_p(\alpha_p)$

  2. **Message Generation**:
  ```math
  M_p: \Sigma_p \times \mathcal{M}_{-p} \to \mathcal{M}_p
  ```
  where $\mathcal{M}_p$ is $p$'s message space and $-p$ denotes the other party

  3. **State Transition**:
  ```math
  \Delta_p: \Sigma_p \times \mathcal{M}_{-p} \to \Sigma_p
  ```

  4. **Output Function**:
  ```math
  Out_p: \Sigma_p \to \{0,1\} \times \{\alpha_{-p}, \bot\}
  ```
  where $(1, \alpha_{-p})$ indicates successful receipt of the other's asset, and $(0, \bot)$ indicates failure

#### 1.2 Security Properties


1. **Completeness**: If both parties follow the protocol honestly, they both receive each other's assets. Formally:
```math
\forall p \in \{A,B\}: \Pr[Out_p(\sigma_p^n) = (1, \alpha_{-p})] = 1
```
This means that for any party $p$, when both parties are honest, the probability of successfully receiving the counterparty's asset is 100%.

2. **Fairness**: Neither party can gain a significant advantage over the other. For any adversarial strategy $\mathcal{A}$ and security parameter $\lambda$:
```math
|\Pr\left[Out_A(\sigma_A^i) = (1,\alpha_B) \land Out_B(\sigma_B^i) = (0,\bot)\right] 
```
```math
- \Pr\left[Out_B(\sigma_B^i) = (1,\alpha_A) \land Out_A(\sigma_A^i) = (0,\bot)\right]| \leq \varepsilon(\lambda)
```
This formula measures the maximum imbalance between:
- The probability of A succeeding while B fails
- The probability of B succeeding while A fails

Where $\varepsilon(\lambda)$ is a negligible function of the security parameter, ensuring the imbalance is insignificantly small.

3. **Termination**: The protocol must eventually complete:
```math
\Pr[\exists n: \forall p \in \{A,B\}: Out_p(\sigma_p^n) \neq \bot] = 1
```
This means there is a 100% probability that the protocol will reach a definitive state for all parties, where the output is not the null state $\bot$.
### 2. Cleve's Impossibility Theorem

Cleve's fundamental result shows that fair exchange is impossible in asynchronous systems without a trusted third party.

#### 2.1 Theorem Statement

**Theorem** (Cleve, 1986): For any two-party fair exchange protocol $P$ in an asynchronous setting without a trusted third party, if $P$ guarantees termination, then for any $\varepsilon < \frac{1}{2}$, there exists an efficient adversary $\mathcal{A}$ such that $P$ does not achieve $\varepsilon$-fairness.

#### 2.2 Proof

The proof proceeds by contradiction:

1. Assume there exists a fair exchange protocol $P$ with $r$ rounds.

2. For each round $i$, define:
```math
p_i = \Pr[Out_A(\sigma_A^i) = (1,\alpha_B)]
```

3. By the termination property and protocol fairness:
   - $p_0 = 0$ (no success at start)
   - $p_r \geq 1 - \varepsilon$ (high success probability at end)

4. By the mean value theorem, there exists a round $k$ where:
```math
|p_k - p_{k-1}| \geq \frac{1-\varepsilon}{r}
```

5. Consider an adversary $\mathcal{A}$ that:
   - Follows the protocol honestly until round $k$
   - If $p_k > p_{k-1}$, aborts at round $k$
   - Otherwise, continues honestly

6. This adversary achieves an advantage of at least $\frac{1-\varepsilon}{2r}$, contradicting $\varepsilon$-fairness. Thus the adversarial strategy allows one party to gain the asset of the other party without having to give up its own asset, or with a lower probability of losing its asset, which violates the fairness criterion of the protocol.

#### Example
Let's consider an exchange protocol $P$ and two parties, Alice and Bob:
- Alice has item $A$.
- Bob has item $B$.
- The goal is to exchange $A$ and $B$ through $P$ such that neither party can cheat by obtaining the other's item without releasing their own.

Formally, let:
- $S_A(t)$ and $S_B(t)$ be the state of Alice and Bob at time $t$.
- $S_A(t) \supset A, B $ means Alice possesses both items at time $t$.
- $S_B(t) \supset A, B $ means Bob possesses both items at time $t$.

Then, **fairness** requires:
```math
\forall t, \quad S_A(t) \supset B \iff S_B(t) \supset A
```
meaning Alice receives $B$ if and only if Bob receives $A$.

Consider now a partially synchronous setting where Alice and Bob communicate over a network with known delays. Suppose there exists a fair exchange protocol $P$ that does not use a trusted third party. We examine the exchange process:

1. Alice sends a partial commitment to A.
2. Bob responds with a partial commitment to B.
3. A final exchange step ensures fairness.

Now, if at any step Bob can **abort** the protocol after receiving useful information, he might gain an advantage. Since messages can always be delayed or lost, it is impossible to ensure atomicity in a two-party protocol without a mediator.
This is at the heart of Cleve's work (1986), where he formally proved that any two-party fair exchange protocol **must be vulnerable to one party aborting with an advantage**. More precisely, he showed that any protocol trying to achieve fair exchange deterministically is inherently unfair, since one party can always stop the process when they gain an advantage, preventing the other from completing their side of the exchange.

Thus:

```math
\text{If no trusted third party is available, then fair exchange is impossible.}
```

### 3. Practical Solutions

Given the impossibility result, several approaches have emerged:

1. **Trusted Third Party (TTP)**:
   - The TTP acts as an escrow
   - Guarantees fairness but requires trust
   - Example: Traditional escrow services

2. **Gradual Release**:
   - Parties exchange assets bit by bit
   - Advantage diminishes gradually
   - Practical for small assets

3. **Optimistic Fair Exchange**:
   - TTP only intervenes in disputes
   - Efficient when parties are honest
   - Commonly used in digital contract signing

## Application to Ethereum's PBS

### 1. The PBS Protocol

Ethereum's Proposer-Builder Separation (PBS) faces the fair exchange problem in block construction:

- **Proposers**: Choose blocks to propose
- **Builders**: Construct blocks with transactions
- **Exchange**: Block content for proposer payment

### 2. Role of Relays

PBS solves the fair exchange problem using relays as trusted intermediaries:

1. **Block Submission**:
```math
Builder \xrightarrow{\text{block}} Relay
```

2. **Header Release**:
```math
Relay \xrightarrow{\text{header}} Proposer
```

3. **Commitment**:
```math
Proposer \xrightarrow{\text{signature}} Relay
```

4. **Final Exchange**:
```math
Relay \xrightarrow{\text{block}} Proposer
```

### 3. Security Analysis

The relay-based solution provides:

1. **Fairness**: Neither party can cheat because:
   - Builder can't withhold payment
   - Proposer can't steal transactions
   - Relay ensures atomic exchange

2. **Termination**: Protocol completes in bounded time

3. **Trade-off**: Introduces centralization risk through relays

## Conclusion

The fair exchange problem exemplifies the fundamental challenges in designing trustless protocols. While Cleve's theorem proves the impossibility of fair exchange without trusted third parties, practical systems like Ethereum's PBS demonstrate how carefully designed intermediaries can enable fair exchange in real-world applications. The challenge remains to minimize trust requirements while maintaining fairness guarantees.

## References

1. Cleve, R. (1986). Limits on the Security of Coin Flips when Half the Processors Are Faulty. *ACM Symposium on Theory of Computing*, 364-369.

2. Even, S., Goldreich, O., & Lempel, A. (1985). A Randomized Protocol for Signing Contracts. *Communications of the ACM*, 28(6), 637-647.

3. Garay, J. A., Jakobsson, M., & MacKenzie, P. (1999). Abuse-Free Optimistic Contract Signing. *CRYPTO '99*, 449-466.

4. Ethereum Foundation. (2024). *Ethereum 2.0 Proposer-Builder Separation (PBS)*. ethereum.org

5. Gordon, S. D., & Katz, J. (2009). Complete Fairness in Multi-party Computation without an Honest Majority. *Theory of Cryptography Conference*, 19-35.