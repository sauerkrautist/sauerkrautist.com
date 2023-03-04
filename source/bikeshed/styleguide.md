---
title: The Elements *of* Autistic Style
css:
  - styleguide
---

With apologies to Robert Bringhurst.
{%- ref 'bringhurst' %}

## Interpunction

We **never** use exclamation points and avoid parentheses in prose unless they disclose the abbreviation for a preceding word, compound 
({% caps 'C' %}, 
 {% caps 'CO' %}, 
 {% caps 'CPD' %}, 
 {% caps 'CMPD' %}, 
 {% caps 'COMP' %}, 
 {% caps 'COMP.' %}, 
 {% caps 'COMPD' %}, et cetera (etc.)) 
{%- ref 'compound' %}
or phrase.
We only nest parentheses on The Road Rage to Lisp
{%- ref 'lisp' %}
or when we are intoxicated beyond help.

We are very upsad that HyperText Markup Language ({% HTML %}) automatically collapses whitespace because we would prefer the opportunity to make a point of not joining sentences with multiple spaces.
{%- ref 'typist' %}

We always join the two numbers of a range with an en dash, and we only pad an en dash with spaces when we need to interrupt our ideas with inline asides because we have exhausted our [endnote quota](#endnotes). We do only use em dashes to prefix a source under long quotations, without whitespace.

We consider it unbearably bad autistic style to start consecutive sentences or paragraphs with the same word or phrase, or to add clauses to sections where they clearly do not belong.

## Notes & references

We use bidirectionally linked Arabic numerals incrementing from 1.

### Footnotes

Welcome, very old person. The web is a continuous medium. Even in reproductions of old print matter, we rigorously disrespect authenticity and transform actual footnotes to

### Endnotes

This is the way.

We do not use bibliographies, by the way.

We also consider it bad autistic style to end sentences or paragraphs with the same word or phrase, or to add clauses to sections where they clearly do not belong.

## Citations

Academic citation styles are a giant hair ball of domain specific languages, invoking serious usability and accessibility problems. We have devised our own simplified format that hopefully is intuitive and compact enough to be both useful and readable.

Template placeholders on this page are marked with a {% var 'bold sans-serif' %} typeface. We **never** use bold type in body copy, with the exception of parody, satire and quotations.

### Generic rules

- Information is grouped with periods.
- A group can be subdivided with a single comma.
- With the exception of the cited source titles
  - We only use parentheses for the publication year.
    - A book's edition is included before the year, separated with a comma.
  - We only use abbreviations for ordinal numbers.
  - We don't use any quotation marks.
- We use full public names for persons, initials if preferred or better known:
  - {% var 'John F. Kennedy' %}
  - {% var 'Edward G. Robinson' %}
  - {% var 'H.G. Wells' %} 
- A placeholder for persons can represent multiple full names joined by interpunction:
  - {% var 'Joni Mitchell' %}
  - {% var 'Paul Simon & Art Garfunkel' %}
  - {% var 'David Crosby, Stephen Stills & Graham Nash' %}
- Since the author can contain a comma, we **always** use a period between author and title if the title is not linked to avoid ambiguity. Otherwise it depends on the contextual information.
- We never use more than one link within a single citation. An endnote might contain additional text containing any number of links after the citation, though.

The following templates are complemented with examples that are generated with our *Eleventy* shortcode. 
{%- ref 'shortcodes' %}
If an example does not match its template, we probably introduced a regression.

Examples are grouped by source category for readability, their formats are not mutually exclusive.

{% set AUTHOR = 'Jane Doe' %}
{% set TITLE = 'The Autistic Woman' %}
{% set TRANSLATOR = 'Hans Dampf' %}

### Books

{% set URL = '#books' %}

- {% var 'Author' %}, 
  [{% var '<cite>Linked title</cite>' %}]({{ URL }}) 
  ({% var 'year' %}).
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      year: year
    } %}
- {% var 'Author' %}, 
  [{% var '<cite>Linked title</cite>' %}]({{ URL }}) 
  ({% var 'ordinal' %} edition, 
  {% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      edition: 12,
      year: year
    } %}
- {% var 'Author' %}, 
  [{% var '<cite>Linked title</cite>' %}]({{ URL }}) 
  ({% var 'year' %}). 
  Translated by {% var 'translator' %}. 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      year: year,
      translator: TRANSLATOR
    } %}
- {% var 'Author' %}. 
  [{% var '<cite>Linked title</cite>' %}]({{ URL }}) 
  ({% var 'year' %}), 
  page {% var 'number' %}. 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      year: year,
      page: 3
    } %}
- {% var 'Author' %}. 
  [{% var '<cite>Linked title</cite>' %}]({{ URL }}) 
  ({% var 'year' %}), 
  pages {% var 'number' %}–{% var 'number' %}. 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      year: year,
      page: [3, 7]
    } %}

The order of preference for linking a book depending on availability is

1. the full source of the book (e.g. Gutenberg, archive.org).
2. the author's webpage about the book.
3. the publisher's webpage about the book.
4. a Wikipedia article or article section about the book.

We **never** link to e-commerce platforms.

### Anthologies

{% set URL = '#anthologies' %}
{% set CONTEXT = 'Women and Autism' %}

- {% var 'Author' %}. 
  [{% var 'Linked title' %}]({{ URL }}),
  {% var '<cite>Anthology</cite>' %} 
  ({% var 'year' %}).
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      year: year
    } %}
- {% var 'Author' %},
  [{% var 'Linked title' %}]({{ URL }}).
  {% var '<cite>Anthology</cite>' %}
  ({% var 'year' %}), 
  page {% var 'number' %}. 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      year: year,
      page: 99
    } %}
- {% var 'Author' %}. 
  {% var 'Title' %},
  [{% var '<cite>Linked anthology</cite>' %}]({{ URL }}) 
  ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: TITLE,
      context: [CONTEXT, URL],
      year: year
    } %}
- {% var 'Author' %}. 
  {% var 'Title' %}.
  [{% var '<cite>Linked anthology</cite>' %}]({{ URL }}) 
  ({% var 'year' %}),
  page {% var 'number' %}. 
  - {% citation {
      author: AUTHOR,
      title: TITLE,
      context: [CONTEXT, URL],
      year: year,
      page: 99
    } %}

Note the difference between the examples with a page reference. There is **always** a period between author and title if the title is not linked.

### Periodical articles <!-- articles -->

For linking articles, use the digital object identifier ({% caps 'DOI' %}), if available.

{% set URL = '#articles' %}
{% set CONTEXT = 'Autism Today' %}

- {% var 'Author' %}, [{% var 'Linked title' %}]({{ URL }}). 
  {% var '<cite>Periodical</cite>' %}, volume {% var 'number' %} ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      volume: 7,
      year: year
    } %}
- {% var 'Author' %}, [{% var 'Linked title' %}]({{ URL }}). 
  {% var '<cite>Periodical</cite>' %}, volume {% var 'number' %} ({% var 'year' %}). 
  Translated by {% var 'translator' %}. 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      volume: 7,
      year: year,
      translator: TRANSLATOR
    } %}
- {% var 'Author' %}, [{% var 'Linked title' %}]({{ URL }}). 
  {% var '<cite>Periodical</cite>' %}, volume {% var 'number' %} ({% var 'month' %} {% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      volume: 7,
      period: 'March',
      year: year
    } %}
- {% var 'Author' %}, [{% var 'Linked title' %}]({{ URL }}). 
  {% var '<cite>Periodical</cite>' %}, volume {% var 'number' %} ({% var 'season' %} {% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      volume: 7,
      period: 'Spring',
      year: year
    } %}
- {% var 'Author' %}, [{% var 'Linked title' %}]({{ URL }}).
  {% var '<cite>Periodical</cite>' %}, volume {% var 'number' %} / issue {% var 'number' %} ({% var 'month' %} {% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      volume: 7,
      issue: 2,
      period: 'Winter',
      year: year
    } %}

We only include page numbers if no authoritative article source link is available.

- {% var 'Author' %}. 
  {% var 'Title' %},
  {% var '<cite>Periodical</cite>' %}.
  Volume {% var 'number' %} 
  ({% var 'year' %}), 
  page {% var 'number' %}. 
  - {% citation {
      author: AUTHOR,
      title: TITLE,
      context: 'Autism Today',
      page: 42,
      volume: 7,
      year: year
    } %}
- {% var 'Author' %}. 
  {% var 'Title' %},
  {% var '<cite>Periodical</cite>' %}.
  Volume {% var 'number' %} 
  / issue {% var 'issue' %} 
  ({% var 'year' %}), 
  page {% var 'number' %}. 
  - {% citation {
      author: AUTHOR,
      title: TITLE,
      context: 'Autism Today',
      page: 42,
      volume: 7,
      issue: 2,
      year: year
    } %}

In rare cases, only the complete volume of the periodical is available online as a single resource. We include page numbers and link the periodical name, volume and year. Not supported yet as a shortcode.

- {% var 'Author' %}. 
  {% var 'Title' %}. 
  [{% var '<cite>Periodical</cite>' %}, 
  volume {% var 'number' %} ({% var 'year' %})]({{ URL }}). 
  Page {% var 'number' %}. 
- {% var 'Author' %}. 
  {% var 'Title' %}. 
  [{% var '<cite>Periodical</cite>' %}, 
  volume {% var 'number' %} / issue {% var 'issue' %} ({% var 'month' %} {% var 'year' %})
  ]({{ URL }}). 
  Page {% var 'number' %}. 

### Webpages

Note: {% var 'year' %} **must** be the date of page content creation or the last significant update, if available. Do **not** use a generic page footer copyright date.

{% set URL = '#webpages' %}
{% set CONTEXT = 'Autistic Bloggers' %}

- {% var 'Author' %}. 
  [{% var 'Linked title' %}]({{ URL }}), 
  {% var '<cite>Website</cite>' %} 
  ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT,
      year: year
    } %}
- {% var 'Author' %}. 
  [{% var 'Linked title' %}]({{ URL }}), 
  {% var '<cite>Website</cite>' %}. 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      context: CONTEXT
    } %}
- {% var 'Author' %}, 
  [{% var '<cite>Linked title</cite>' %}]({{ URL }}) 
  ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL],
      year: year
    } %}
- {% var 'Author' %}, 
  [{% var '<cite>Linked title</cite>' %}]({{ URL }}). 
  - {% citation {
      author: AUTHOR,
      title: [TITLE, URL]
    } %}
- [{% var 'Linked title' %}]({{ URL }}), 
  {% var '<cite>Website</cite>' %} 
  ({% var 'year' %}). 
  - {% citation {
      title: [TITLE, URL],
      context: CONTEXT,
      year: year
    } %}
- [{% var 'Linked title' %}]({{ URL }}), 
  {% var '<cite>Website</cite>' %}. 
  - {% citation {
      title: [TITLE, URL],
      context: CONTEXT
    } %}

### TV shows

We only identifiy the writers.

{% set URL = '#tv-shows' %}

- {% var 'Writer' %}. 
  [{% var 'Linked episode' %}]({{ URL }}), {% var '<cite>Show</cite>' %}. 
  Season {% var 'number' %}, episode {% var 'number' %} ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: ['Pilot', URL],
      context: 'BDSM-5',
      episode: [1, 1],
      year: year
    } %}
- {% var 'Writer' %}. 
  {% var 'Episode' %}, 
  [{% var '<cite>Linked show</cite>' %}]({{ URL }}). 
  Season {% var 'number' %}, episode {% var 'number' %} ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: 'Pilot',
      context: ['BDSM-5', URL],
      episode: [1, 1],
      year: year
    } %}

We only identify the episode of a show with a single series.

- {% var 'Writer' %}. 
  {% var 'Episode' %}, 
  [{% var '<cite>Linked show</cite>' %}]({{ URL }}). 
  Episode {% var 'number' %} ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      title: 'Pilot',
      context: ['BDSM-5', URL],
      episode: 1,
      year: year
    } %}

We refer to the entire show by providing its broadcasting year or year range.

- {% var 'Writer' %},
  [{% var '<cite>Linked show</cite>' %}]({{ URL }})
  ({% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      context: ['BDSM-5', URL],
      year: 2001
    } %}
- {% var 'Writer' %},
  [{% var '<cite>Linked show</cite>' %}]({{ URL }})
  ({% var 'year' %}–{% var 'year' %}). 
  - {% citation {
      author: AUTHOR,
      context: ['BDSM-5', URL],
      year: [2001, 2003]
    } %}

{% endnotes 'Note.js' %}
  {% note 'bringhurst' %}
    {% citation {
      author: 'Robert Bringhurst',
      title: [
        'The Elements of Typographic Style',
        'https://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style'
      ],
      edition: 3,
      year: 2004,
      page: 99
    } %}
  {% endnote %}
  {% note 'typist' %}
    "Your typing as well as your typesetting will benefit from unlearning this quaint Victorian habit."
    —Bringhurst, 2004, pages {% range [28, 30] %}.
  {% endnote %}
  {% note 'compound' %}
    Some words have so many domain specific abbreviations that we wonder if it is actually worth using them.
  {% endnote %}
  {% note 'lisp' %}
      Lisp is an irrelevant programming language with a funny syntax that uses lots of nested parentheses and puts its operators up front in expressions, which makes it beloved by old white computer scientists and middle-aged white Silicon Valley entrepeneurs. 
      {%- ref 'tautology' %}
      Confer (cf. ('compare')):

      - {% citation {
          author: 'Paul Graham',
          title: [
            'Paul Graham’s Road to Lisp', 
            'https://web.archive.org/web/20091001052739/http://wiki.alu.org/Paul%20Graham%27s%20Road%20to%20Lisp'
          ],
          context: 'Internet Archive: Wayback Machine',
          year: 2009
        } %}
      - {% citation {
          author: 'Steve Yegge',
          title: [
            'Lisp is Not an Acceptable Lisp', 
            'http://steve-yegge.blogspot.com/2006/04/lisp-is-not-acceptable-lisp.html'
          ],
          context: 'Stevey’s Blog Rants ',
          year: 2006
        } %}
  {% endnote %}
  {% note 'tautology' %}
    We are in the process of adding the theory of tautologies to our absent mind so we can identifiy and avoid them, because we have been informed that they are bad [autistic style](#main).
  {% endnote %}
  {% note 'shortcodes' %}
    {% citation {
      title: ['Shortcodes', 'https://www.11ty.dev/docs/shortcodes/'],
      context: 'Eleventy Documentation'
    } %}
  {% endnote %}
{% endendnotes %}
