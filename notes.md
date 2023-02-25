**Action Items**
- Create a nice 404 page
- Add line to timeline panel
- Add error handling to the backend

**Questions**:
- Is there a strategy for when to create new components?
- How to handle CSS containers with styled components? Flex container VS Flex Item & Overflow - Dependencies between components
- How to handle dynamic parts? For example a panel? Use Global state to control visibility or create routes for it? 
- Is there a good way to order the imports? Components -> Hooks? 


- You work feature by feature? Or by technology
- What should be responsible for filtering?
- How to allow the number field to be empty?
- How to set date to be relative?
- Where should I put the CSS ... For example I want to set the widget of the tags, in the todo item. 
- What is GitHub fork, will it do something to my project?
- I have two event handlers on the same button? How can I override them? 
- Should I use a component library? 


Database Sync Questions? 

- Is it not overkill to go through all the data on each action? 
- If an new item is created on the client, how do I generate the Id for it on Mongo? 
- If an item is deleted from a different client? 

- Keep the id's in mongo the same? 
- What about multiple clients? Another client has deleted something on the DB? 

How to do keyboard navigation in the modal?



- where to put loaders? how to handle loaders globally? suspense?  
- How to secure socket conneciton? Socket middleware? 

React Hook Forms



Project Questions 12th Feb 2023

- Back end errors? Throw exceptions? Respond with 400 server response? 
- How to handle 400/500 responses on the client? Throw errors? Render an Error UI?
- What to store in the server side, what to store in the local storage? 
- How would you add a modal

Data modelling:
- Todos - They have an owner, and the owner can belong to an organization. 
  - Need to sometimes get all the todos for an owner
  - Need sometimes to get all the todos in an organization

Changing the data model
- Changing property names? 
- Moving from a reference to an organization entity from a organization name
- Deployment broke, because I changed the schema


Forms
- Should I make one form component that highly configurable? Or separate forms
- 

Auth:
JWT token - Should I use bearer pattern for passing the access token? 
Where should I check Role / access to the specific Todo?  Get / Update / Delete / Create

Should I store the the org ID and the User ID on the todo? Or should I store the org ID on the user and do a Join to get the all todos for the org. 

When server is down, there is no response??? How to handle timeouts? 

Drop down with users
- Keep a list of users in the state
- Or get a list of users from the database?


Deployment - Online version feels very slow
  Optimistic updates? 


Mongoose:
How to filter on populated fields? 
Using Lean to just convert results to POJO? 

**Course**
- Sockets?
- Forms? Formik?
- Loading? Suspense?