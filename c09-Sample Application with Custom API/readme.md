Hydra Overview
===

The sample application named "Hydra" is a document writing tool, 
intentionally simple but representative of real-world challenges.

Think of Hydra as a simplified version of CodePen or JSFiddle.

# Features:

1. Users can write articles in Markdown.
2. Final text is rendered to HTML.
3. Articles belong to a single user (the owner).
4. Owners can share articles with others using attribute-based access control (ABAC).
5. Two access levels:
   * Reader: can view articles.
   * Editor: can create and update articles.
6. Each edit produces a new version (no concurrent editing).
