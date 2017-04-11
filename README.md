# miaou.mastodon

Mastodon boxing for Miaou

[![Chat on Miaou](https://dystroy.org/miaou/static/shields/room-fr.svg?v=1)](https://dystroy.org/miaou/3?Code_Croissants)
[![Chat on Miaou](https://dystroy.org/miaou/static/shields/room-en.svg?v=1)](https://dystroy.org/miaou/1?Miaou)

## What it does

A toot URL in a Miaou message is replaced with a rendering of that toot:

![Boxed Toot](doc/box-sample.png)

## How it works

When the Miaou boxer sees a message containing what looks like a toot URL, it sends a HEAD request to that URL.

If a `link` header of type `application/atom+xml` can be found in the answer, that new URI is requested.

The resulting XML is rendered in HTML and this HTML is sent to all browsers rendering the Miaou message.
