import sys
import os
sys.path.append(os.path.abspath('../python/xpath-helper/xpath_helper'))
# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))

# -- Project information -----------------------------------------------------

project = 'xpath-helper'
copyright = '2021, Johann Rebecchi'
author = 'Johann Rebecchi'
master_doc = "index"
language = "en"


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx.ext.githubpages',
    'sphinx.ext.autodoc',
    'sphinx_js',
    'myst_parser'
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', 'venv']


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'alabaster'

# https://alabaster.readthedocs.io/en/latest/customization.html
html_theme_options = {
    'github_user': 'jrebecchi',
    'github_repo': 'xpath-helper',
    'github_type': 'star',
    'logo': 'logo.svg',
    'logo_name': False,
    'page_width': '1240px',
    'sidebar_width': '260px',
    'fixed_sidebar': True,
    'show_powered_by': False,
    # Colors
    'link': '#da2590ff',
    'sidebar_link': '#da2590ff',
    # Fonts
    'font_family': 'sans-serif'
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

html_sidebars = {
    '**': [
        'about.html',
        'navigation.html',
        'relations.html',
        'searchbox.html',
        'donate.html',
    ]
}

highlight_language = 'js'
pygments_style = 'autumn'

# -- sphinx-js configuration -------------------------------------------------
# https://github.com/mozilla/sphinx-js/issues/72

root_for_relative_js_paths = '..'
js_language = 'typescript'
jsdoc_config_path = '../javascript/xpath-helper/tsconfig-cjs.json'
js_source_path = '../javascript/xpath-helper/src/'
