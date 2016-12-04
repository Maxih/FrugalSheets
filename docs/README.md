# FresherNote

[FresherNote live][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

FrugalSheets is a web application inspired by Google Sheets build using Ruby on Rails and React/Redux. By the end of Week 9, this app will, at a minimum, satisfy the following criteria with smooth, bug-free navigation, adequate seed data and sufficient CSS styling:

## Features & Implementation

 **NB**: don't copy and paste any of this.  Many folks will implement similar features, and many employers will see the READMEs of a lot of a/A grads.  You must write in a way that distinguishes your README from that of other students', but use this as a guide for what topics to cover.  

### Document Editing and Rendering

  Documents are stored in one table in the database, which contains columns for `id`, `author_id`, `title`, `created_at` and `updated_at`. Each Document is joined by several Sheets, which contains columns for `id`, `document_id`, `name`, `content`. Upon login, an API call is made to the database which joins the users and documents table, filtering by the current user's `id`.

  On selection of a document to be edited, the corresponding Sheets are fetched via an API call, filtering by `document_id`. The sheets are then stored in the `SheetStore`, and rendered in the `Doc` component. The `Doc` component houses a `ToolBar`, `Grid`, and `SheetNav`. The first Sheet is selected as the default Active Sheet and its data is rendered in the `Grid` component. The `Grid` component allows for selection of an `activeCell`, which is stored in the `SheetStore`s `workingArea`. The default `activeCell` is the cell at coordinates `0,0`. With selection of an `activeCell`, the `ToolBar` component becomes active and allows for alteration of the `activeCell`s content.

  The UI of the `Doc` component and its subcomponents is taken directly from Google Sheets for a professional, recognizable, clean look.
