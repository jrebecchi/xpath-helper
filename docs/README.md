Online documentation is at https://krypton-org.github.io/krypton-auth.

# Instructions for building the documentation

```bash
npm install -g typedoc
python build.py
```

- [reStructuredText basics](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html)
- Docstring can contain JSDoc and reStructuredText annotations, but no markdown.
  See https://github.com/mozilla/sphinx-js/issues/69

# Customization

- `_templates/about.html`: fork of alabaster about.html with links to GH Actions and Coveralls instead of Travis-CI and Codecov.

# Extensions

- [mozilla/sphinx-js](https://github.com/mozilla/sphinx-js): sphinx_js

