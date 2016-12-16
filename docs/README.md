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

  The `Grid` component takes care of rendering the `GridHeader`, and the `GridCell`s. `GridHeader`'s are locked in place relative to the grid-wrapper element, and javascript is used to move their position as the user scrolls through their spreadsheet. `GridCell`s are span elements, that when activated by a click, are rerendered into text-areas which live-update their changes to the store. The store only contains entries for `GridCell`s who have been edited after creation of a sheet, in order to minimize the amount of comparisons and the size of the store redux has to manage.

  On mouse down, the `selecting` property of the working area is set to true, allowing any cells that have been hovered over since the beginning of the mouse down to increase the `activeRange` property of working area. On mouse up event, the selected range is captured, allowing any style changes to apply to the entire range.


### SheetNav Component

  The `SheetNav` component allows for additional sheets to be added to the `Document`. Each sheet contains its own `workingArea`, as well as cell map. The `SheetNav` Component switches which sheet is active, which dictates which sheet every `Grid` or `ToolBox` action is applied to.


### Formula Class

  The `Formula` class takes a formula string as an argument in the constructor and parses it into an evaluatable formula. First, it applies a regular expression to the string to filter out all quoted text, so that it is not evaluated as part of the formula. Next, another regular expression is used to capture all associated cells or cell ranges. A hashmap of these values is stored as an instance variable, to be used by the caller of the Formula method to populate with its appropriate value. If the value of the cell or range is another Formula, it is recursively evaluated until none of the associated cells are formulas. Next, it applies a custom `splitByComma` function which will ignore all commas nested inside of parenthesis, in order to ensure that nested formula methods are not evaluated prematurely. After the string has been split into its Function name, and its arguments, the evaluated arguments are passed to the javascript function described by their formula name and evaluated.

### Charts Component

  The `FloatingChart` component takes a cell range, and converts it into a format that can be inserted into the Chart.js library. `backgroundColor` properties of cells in the `titleRange` are passed into the Chart.js class and used as the background color for their chart properties, if applicable.
