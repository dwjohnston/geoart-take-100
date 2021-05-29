## Conceptual thoughts: 

Conceptually - I think all 'controls' whether that is a leaf 'actual control', or a composite 'this thing creates some drawables', end up coming in two forms. 

- Standard tree like structures. 
- Some kind of portaling to allow y-shaped and other models. 


### Frontend 

- I think we've got this sorted. 
All FE controls are just: 

input config -> component -> output value 

Where the input config and the output value both have an id to identify the value. 

### Drawing 

Conceptually, drawing things should be agnostic, just 'here's a list of drawables, please draw them'.  Basically what I've got in that blacksheep-geometry or whatever. 

### The logic model. 

This is where things are less certain - 

At the moment I'm going for an OO model, basically because that makes the most sense in terms of reasoning about the code and how things are wired together. 

But the other part, is that we need certain parts of the logic model to respond to FE controls. 

What I've currently got is the concept of 'ValueMakers' - that is - in the logic model we never refer to contants, - we refer to a StaticValueMaker. 

Now - from the point of view of the logic model, whether a StaticValueMaker has a FE controller behind it doesn't matter, it just provides a consistent single value. 

Now, continuing this logical progression - we also have the concept of other kinds of value makers, those are typically (always?) going to be `Tickable` - things like OrbitingValueMaker, or SineValueMaker. 

Now those have parameters that ultimitely are static value makers, frequence, amplitude, etc. nb. Technically those could also be other DynamicValueMakers, eg for doing AM or FM sine generation. 

But basically, StaticValueMakers, whether FM controled or not are the 'leaf nodes' of the model. 

#### Portals. 

Ok, so now something I'm thinking about, is having the concept of 'portals' to support Y shaped models, etc. 

As an example, lets say we are drawing two sine waves, they both have the same amplitude, but they control their frequency independantly, this might look like: 


```
amp: StaticValueMaker<number>; 
sine1: SineValueMaker({
    freq: StaticValueMaker<number>; 
    amp: PortalValueMaker('amp')
})
sine2: SineValueMaker({
    freq: StaticValueMaker<number>; 
    amp: PortalValueMaker('amp')
})


```



#### Extracting the controls from the logic model. 


We need someway of saying, 'for this given logic model, we need automatically represent all values as FE' controls. 

Now, for a UI perspective perhaps we want to: 

- Group controls
- Hide controls (ie. they are an unchangable constant). 
- Apply labels. 

I think the way to do this is to have a secondary defintion that relates to the controls only. 

What I'm still stuck on, is how you extract all the value makers. 

I guess it's just that if it's a ValueMaking leaf node, it can have a 'getConfig' type of function. 






## TODO

- Performance fucking sucks
- Make model respond to controls


