# miaou.mastodon

Mastodon boxing for Miaou

[![Chat on Miaou](https://dystroy.org/miaou/static/shields/room-fr.svg?v=1)](https://dystroy.org/miaou/3?Code_Croissants)
[![Chat on Miaou](https://dystroy.org/miaou/static/shields/room-en.svg?v=1)](https://dystroy.org/miaou/1?Miaou)

## What it does

A toot URL in a Miaou message is replaced with a rendering of that toot:

![Boxed Toot](doc/box-sample.png)

## How it works

The rendering is built using the Atom XML page.

The resulting XML is rendered in HTML and this HTML is sent to all browsers rendering the Miaou message.

Determining the URL of this Atom page depends on the URL format:

### Remote Mastodon Instances

When the toot URL is in the format `https://<domain>/users/<user>/updates/<num>`, the boxer just adds `.atom`.

### Local Mastodon Instance

When the toot URL is in the format `https://<domain>/@<user>/<num>`, then the `<num>` isn't the right one.

In such a case the boxer sends a HEAD request to that URL and looks for the `link` header of type `application/atom+xml` which can be found in the answer.

