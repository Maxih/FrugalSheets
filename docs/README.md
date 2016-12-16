# FrugalSheets

[FrugalSheets live][heroku]

[heroku]: https://frugalsheets.herokuapp.com

### Document Editing and Rendering

  Documents are stored in one table in the database, which contains columns for `id`, `author_id`, `title`, `content`, `created_at` and `updated_at`. Upon login, an API call is made to the database which joins the users and documents table, filtering by the current user's `id`.

  On selection of a document to be edited, the users permissions are validated by checking that they either authored the document or are a member of a group that contains that document.

  The Spreadsheet is rendered in one component, the doc component, which breaks up each part of the spreadsheet into the `ToolBox`, the `Grid`, and the `SheetNav`.

### ToolBox Component

  The `ToolBox` component contains all of the styling properties that can be applied to an active cell or working area. The `ToolBox` is broken down into `CellInput` and `CellStyle`, the `CellInput` allowing the user to edit the content of the Working Area, and the CellStyle allowing the user to edit the style of the Working Area.

### Grid Component

  The `Grid` component takes care of rendering the `GridHeader`, and the `GridCell`s.
