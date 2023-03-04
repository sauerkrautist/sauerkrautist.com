---
title: Accessibility statement
---

This website aims to be accessible to the wildest possible audience.
{%- ref 'language' %}

## Reporting issues

If you think that we made odd design choices, the odds are that our neurotype didn't offer any, but you can always 
[create an issue]({{ GITHUB_ISSUE }}/new) 
on GitHub.
{%- ref 'wcag' %}

## Assistive technology

The following is a list of Assistive Technology ({% caps 'AT' %}) that we are able to use for functional reproduction of bug reports. For everything else we will likely need a fairly detailed description.

### Windows

- NVDA
- Narrator
- High contrast (Windows 10)
- Speech Recognition
- Magnifier

### iPadOS & macOS

- VoiceOver
- Voice Control
- Zoom

### Android

- TalkBack

### Linux

- Orca

{% set heading %}
  #a11y
  {%- ref 'a11y' %} 
  disclaimers
{% endset %}

{% endnotes heading %}
  {% note 'language' %}
    [*Ableism/Language<!-- en -->*](https://www.autistichoya.com/p/ableist-words-and-terms-to-avoid.html)
    by Lydia X. Z. Brown is a wild resource for improving your inclusive language game.
  {% endnote %}
  {% note 'wcag' %}
    This site is not a bootcamp for wannabe {% WCAG %} auditors. Cf.
    [*These aren't the {% caps 'SC' %}s you're looking for...*](https://www.youtube.com/watch?v=n-eM7_eYuCs)
    by Patrick H. Lauke.
  {% endnote %}
  {% note 'a11y' %}
    The [numeronym a11y](https://www.a11yproject.com/posts/a11y-and-other-numeronyms/)
    and its hashtag are to many disabled people what the *autism community* is to the 
    [*#actuallyAutistic community*](https://www.enculturation.net/I_Am_ActuallyAutistic).
  {% endnote %}
{% endendnotes %}
