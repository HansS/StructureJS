##StructureJS (ReadMe In Progress)

#####WebStorm & Sublime Text Templates/Snippets
[https://gist.github.com/codeBelt/9166803](https://gist.github.com/codeBelt/9166803)

####Core Classes
* ___DOMElement___
	* All your view classes will extend the DOMElement class and all your views will have the following lifecycle: createChilderen, layoutChildren, enable, disable and distroy. The DOMElement has several convenient methods (addChild, addChildAt, removeChild, getChild, etc.) to provide a structured base for your view classes. Within your views you will be able to listen and dispatch class based events. This is because DOMElement extends the EventDispacter class and your views will support event bubbling, stopPropagation and stopImmediatePropagation.		
	
* ___Stage___
	* The Stage class is what your main application class will extend. This class extends the DOMElement class and the only difference you will notice is it has an appendTo method. This allows us to use an id name, class name or tag name where we would 
	
* ___EventDispatcher___
	* The EventDispatcher class is the base class for all classes that need to dispatch events. For example if you wanted to create a Controller class you would extend EventDispatcher. The DOMElement class extends EventDispatcher which allows events to bubble throughout the display list. 
	
* ___EventBroker___
	* EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications. Loosely coupled event handling, the subscriber does not have to know the publisher. Both of them only need to know the event type. Basically the EventBroker class is a static version of the EventDispatcher class.

* ___BaseEvent___
	* DOMElement extends EventDispatcher
	So we saw how our views show work. Now lets briefly talk about the EventDispatcher class and the BaseObject. First the EventDispatcher can be used to create your Controller or Model classes that need to dispatch events.

	* When ever you want to create a Event Class you should extend BaseEvent .
	

* ___ValueObject___
	* Value Object (VO) is a design pattern used to transfer data between software application subsystems.
	
	
* ___eventListener jQuery Plugin___
	* When creating JavaScript classes you will run into an issue where you cannot remove event listeners once you've added them. To get this to work you typically need to assign your bind function call(s) to a property on the class. 
	* To learn more about the eventListener jQuery plugin check out [https://github.com/codeBelt/jquery-eventListener](https://github.com/codeBelt/jquery-eventListener)