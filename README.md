# Circles

In the click area, the onClick handler populates the points array that is a state variable.

onClick calls the handleClick function which updates points via setPoints, setting X & Y coords based on the mouse click

How can points be removed?

First thought is to simply remove the last element from the points array. Did this by giving the “Undo” button an onClick function to simply push the last element of the points array into an undo array (to save in case of redo). However this doesn’t force an update on the page.

I believe this is because the modification of the array does not occur in state and therefore does not trigger a re-render (React does not ‘see’ the update)

Confirmed via React docs that state cannot be mutated directly,
A new copy must be made in order to successfully re-render.

Possible solutions -

.filter -> return a new array containing every element that passes a test

.slice/splice -> ???

- .slice works, but need to experiment some more and get it going in conjunction w the redo (save the deleted points)

.pop <- NO! mutates the array

## 3/9/2023

The solution that works for now is to, when the undo button is clicked, call the
setPoints state updater and return a NEW ARRAY (not mutated!) with the last element removed.

Now I want to restore deleted points with the redo button.

In ordery to do this I think I will need to create a state variable for DELETED POINTS. Keeping in mind that the array will need to be recreated at every update so simply pushing into the array won't work.

My intuition is that it should just be a matter of appending the last deleted coords from the deleted array back into the points array.

\*\* POINT OF CONFUSION!!

The mechanics of actually modfying the arrays and moving values around appears murkey, mostly due to some ambiguity about the setPoints function and it's use of the spread operator and objects in the array...Spending some time here.

\*\* SOME CLARITY - Needed to brush up on spreading into setState, intuition appears to have been correct but my syntax was off. Instead of enclosing the whole statement in square brackets:
setDeletedPoints([...deletedPoints, points[points.length-1]])

I had it written incorrectly, as such:
setDeletedPoints([...deletedPoints], points[points.length-1])

After making that change I can observe the deletedPoints array gaining elements when undo is clicked.

When you click in the 'area', onClick fires the handleClick function which in turn returns the setPoints updater which ...spreads in the array of existing 'point' coord objects, using the event.clientX/Y instance property (lookup)

-(DEFINITION) INSTANCE PROPS: instances are copies of objects (from class?), for example if you make a person object class, all the individual 'people' objects will be instances of that. Instance properties would be the properties that are unique to each individual object (hair color, height, etc.). My understanding is that an INSTANCE, not just the CLASS, must exist in order for the properties to be called.

Now if we want to redo, it should be a matter of taking the last val from deletedPoints and updating setPoints with those coords. Just reversing the process used to update deletedPoints seems to work just fine.

Still would like to clean up button behaviours...Stop pushing undefined vals to deletedPoints from Undo when there is nothing in points

\*\* CHECKED WORK AGAINST VIDEO SESH: - Made things a bit more complicated that they need to be by using .slice,
same thing can be done with the ...spread operator, instead of making setPoints a .slice it can just be done as [...points]

- Need to make a conditional check for undo to keep from sending undefined vals,
  tried to just do a simple if() but now undo is broken

-Error on GET, looking for favicon.ico for some reason

ODD BEHAVIOUR - Divs all shift when developer console is opened, dots stay at same
screen coords

## 3/13/23

Going to shift focus to Sudoku for a bit but will return to this to address:

- Fix click responsiveness, no 'dead' clicks!
- Contain picked points to the app 'area'
- tweak undo and redo, its the wild west!
