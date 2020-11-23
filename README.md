# SAPUI5 application serving 1.71 library version

## First start: use terminal commands

- npm install

## Start project: use terminal commands:

1. node proxy.js
2. Open url "http://localhost:8005/index.html"

## Proxy setup for backend connection to sap or reference odata services Proxy

Maintain "connection.json" file:

1. "mainPort": defines which port is used to serve static files
2. "proxyPort": defines port through which final app is consumed
3. "services": proxy searches for entity name ("Northwind" in this case) in
   "connection.json" and replaces the name with configured path in server
   request.

Setting different combination of mainPort and proxyPort for different apps will
allow you to have multiple instances of applications running at same time.

Optionally: target in connectionJson should point to the same location as
datasource uri in manifest.json

## Important Fiori links:

- [Design guidelines](https://experience.sap.com/fiori-design-web/). Contains
  general rules. Also allows to select, which element is used in which case.For
  example, search for element "Switch" and read "Usage" section.

- [Fiori version 1.71.27 tutorials](https://sapui5.hana.ondemand.com/1.71.27/#/topic/8b49fc198bf04b2d9800fc37fecbb218)
