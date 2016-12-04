## Component Hierarchy

**AuthFormContainer**
 - AuthForm

**HomeContainer**
 - DocList
 - GroupList

**Doc**
 - ToolBar
 - Grid
  + GridHeader
  + GridRow
  + GridCell
    * CellInput
 - SheetNav

**ToolBar**
 - TextEditor
 - Formula
  * CellInput

**GroupList**
 - Groups
 - NewGroup

## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up" | "AuthFormContainer" |
| "/sign-in" | "AuthFormContainer" |
| "/" | "HomeContainer" |
| "/doc/:docId" | "DocContainer" |
