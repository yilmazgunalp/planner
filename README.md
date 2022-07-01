# Day Planner

## Main difficulty in implemantation

Using handles that are absolutle positioned. Mouse target element becomes this handle and you have to write alot of logic to handle/igmore when the mouse event is happenning on these elements.

### Gotchas

- You need that slotindex+1 on Resize handle otherwise **leftOrRight** becomes unknown
