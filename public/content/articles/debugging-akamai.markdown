---
title: "Debugging Akamai Headers"
tags: [akamai]
date: 2014-02-07T12:34:58+03:00
---

If you've got anything to do with Akamai's caching, surely there must have come a time where you needed to find out whether your content is being cached at Akamai. 

## Pragma Headers

The easiest way to test whether your content is cached at Akamai is to do via custom Pragma headers. What are Pragma headers you might say? The HTTP Specification has a simple definition of Pragma headers. 

> The Pragma general-header field is used to include implementation-specific directives that might apply to any recipient along the request/response chain. All pragma directives specify optional behavior from the viewpoint of the protocol. 

In short, Pragma headers specific cache headers[^1] that are can be used by any party in the entire chain from request-response (in our case Akamai) to communicate specific caching functionality. 

Here's how you can do it -

```
~ curl -H "Pragma: akamai-x-cache-on" -H "Pragma: akamai-x-check-cacheable" -I "http://static.xcite.com/skin/frontend/orange/default/images/xcite_logo.png"

HTTP/1.1 200 OK
Server: nginx/0.8.55
Content-Type: image/png
Last-Modified: Sun, 02 Feb 2014 00:29:51 GMT
ETag: "26d8eb2-1c43-4f16181581dc0"
Accept-Ranges: bytes
Content-Length: 7235
Cache-Control: max-age=2142389
Expires: Tue, 04 Mar 2014 04:06:26 GMT
Date: Fri, 07 Feb 2014 08:59:57 GMT
Connection: keep-alive
X-Cache: TCP_MEM_HIT from a168-187-253-133 (AkamaiGHost/6.14.4-12151432) (-)
X-Check-Cacheable: YES
```

In the above curl request we are sending **Akamai Specific** Pragma headers to fetch a static `png` file from a URL that is on Akamai. The two key response headers that important here are the last two `X-Cache` and `X-Check-Cacheable`. Below is a curl request to a asset which is not cached by Akamai.

```
 ~  curl -H "Pragma: akamai-x-cache-on" -H "Pragma: akamai-x-check-cacheable" -I "http://www.xcite.com"

HTTP/1.1 200 OK
Server: nginx/0.8.55
Content-Type: text/html; charset=UTF-8
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
Pragma: no-cache
X-Served-By: 381172-web1 1.0-1549
X-Frame-Options: sameorigin
Date: Fri, 07 Feb 2014 09:09:22 GMT
Set-Cookie: frontend=kbpnphh3o3ohbmvu9j83ioigv6; expires=Fri, 07-Feb-2014 10:09:21 GMT; path=/; domain=.xcite.com; HttpOnly
X-Cache: TCP_MISS from a217-243-192-27.deploy.akamaitechnologies.com (AkamaiGHost/6.14.3.5-12122608) (-)
X-Check-Cacheable: NO
```

As you can see, `X-Check-Cacheable` here is `NO` which indicates that content is not cached on Akamai.

I just used 2 pragma headers for testing, there are few others pragma headers that you can use to get even more information 

 - akamai-x-cache-on
 - akamai-x-cache-remote-on
 - akamai-x-check-cacheable
 - akamai-x-get-cache-key
 - akamai-x-get-extracted-values
 - akamai-x-get-nonces
 - akamai-x-get-ssl-client-session-id
 - akamai-x-get-true-cache-key
 - akamai-x-serial-no

See you next time!

[^1]: To learn more about caching and headers go through this [awesome blog post](http://www.mnot.net/cache_docs/)
