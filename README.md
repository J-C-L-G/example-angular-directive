# Angular Controller <> Directive communication example

Since I had issues finding a good explanation on how to tie together a controller and a directive with isolated scope I decided to create my own blog post on this subject. This repo contains a runnable example of the solution. It has a Spring Boot Web Application that can be started to act as a HTTP server but all the interesting stuff is in the src/main/webapp folder.

## Problem description

To create modular code with AngularJS you want to create reusable components; directives. And directives that are reusable should not depend in any way on the controller of the stuff that created the directive; they should not be able to look 'up' and see any of the scope unless it's explicitly provided to them. To do this Angular directives can have an isolated scope (which in my opinion should be the default).

This however leads to an issue: typically a directive needs information provided for them, needs to provide methods that can be called and often also has to fire events that the layers above the directive need to be able to respond to. Especially the latter part, informing the scopes above of changes, is done in a somewhat particular way.

## Solution

So let's get down to the actual code. The entire Angular application is contained in the in app.js file; it only contains a controller ('MainCtrl') and a directive ('directive'). When you run the application you should see two blocks (showing the two separate scopes) with click counters and a button. When you click the button all counters should go up by one.

Under the hood is where the interesting stuff happens. As you can see the directive has an isolated scope and provides bindings for an 'options' object and an onClick function. When you click the button inside the directive it will increase it's local clicks var by one, and send this var to whatever onClick function is passed to it in the directives attributes (mind you: the attribute name is on-click; angular matches these naming conventions for you). What's important to notice is how the method parameters are handled; you **need** to provide an actual object with members named as the function params. Trying to call $scope.onClick(clicks) **will not** work!

The controller who has passed it's own local onClick function to the directive will receive these events and use this to update it's local 'clicks' var. It then uses the options.registerClicks function to let the directive know that it received the clicks. The directive then also updates the registeredClicks var in it's local scope.

This demonstrates a scenario where a directive and controller communicate to and from while still using an isolated scope for the directive. 
