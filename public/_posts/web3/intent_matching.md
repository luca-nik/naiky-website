---
title: Intent Matching: A Linear Algebra Approach to Swap Order Execution
excerpt: Come get a look to my geometrical interpretation of the intent matching problem in DeFi
coverImage: /posts/intent_matching/cover.jpeg
date: November 14, 2024
---
---

In the decentralized finance (DeFi) space, finding matching intents—such as swap orders between different tokens—is a key challenge. The concept of intent matching relates to the process of identifying closed loops in an intent-multigraph. Each user’s intent is represented as a directed edge between tokens, and finding a valid match requires satisfying certain price conditions for all participants in the loop.

This blog post introduces basic ideas surrounding intent matching, particularly focusing on the execution of swap orders with a limit price. The intent-matching problem can be reduced to a system of equations, with solutions indicating whether a valid match between different users' intents can occur.

In the following document, I explore different cases, including no partial fills and partially fillable intents, analyzing how intent matching can be validated efficiently using linear algebra tools.

Stay tuned

<iframe src="../../_documents/intent_matching.pdf" width="100%" height="600px"></iframe>

