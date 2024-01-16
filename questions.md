**1. What is the difference between Component and PureComponent? Give
an example where it might break my app.**
**Answer:**
- Regular component is class base  component which re-renders i,e. calls the render method whenever its state or props gets changed even though the output remains same
.eg: 
import React, { Component } from 'react';
class MyComponent extends Component {
  render() {
    return <div>{this.props.value}</div>;
  }

Pure component is also  class base component but it prevents the unnecessary re-rendring of components if there is no change in props or state. Basically it does shallow comparison.

class MyPureComponent extends PureComponent {
  render() {
    return <div>{this.props.message}</div>;
  }
}

risk: when there is any changes in state variable (array, object etc) due to mutability behaviour in that case it can break .
for eg: state has an 

this.state{
arr=[]
}

and or any even fire user mutate the value by pushing in state variable. In that case this pureComponent will do shallow comparison with the new variable & not able to detect the changes in state variable. To solve this its better to create new array .

**2. Context + ShouldComponentUpdate might be dangerous. Why is that?**
**Answer**
- context is used to passed data to every level of the component & it is wrap  with the <provider/> where as ShouldComponentUpdate is a react cycle method which helps is providing whether the component should re-render or not .
Use of context & ShouldComponentUpdate can be dangerous as context provides a way to pass data through each level of component without having to pass props explicitly at every level. However, when using ShouldComponentUpdate, a component may not update even if the context it depends on changes. This can lead to in components not reflecting the updated values.


**3.Describe 3 ways to pass information from a component to its PARENT.**
**Answer**
- 1. by callbacks - by sending the callback function to parent with details
  2. by refs - by accesing the node of child in parents
  3. by context 
  4. by redux/mobx
 
**4. Give 2 ways to prevent components from re-rendering.**  
**Answer**
1. using hooks -  context , usecallbacks
2.  memo-(to memoized the functional components, preventing them from re-rendering if their props haven't changed.)
3. using Purecomponents

**5 What is a fragment and why do we need it? Give an example where it might
break my app.**

**Answer**
-Fragment can be also written as <> </>. It basically  use to wrap elements without any additional node to be added in DOM.
We need it as Avoiding Extra DOM Elements where we only need to wrap our components in single element .

eg: <>
      <div>....</div>
      <div>....</div>
      <div>....</div>
      <p>....</p>
    </>

**6. Give 3 examples of the HOC pattern.**
**Answer**
- HOC is a component which takes the function as an argument and returns the new compnent wrapping the original component .
eg:

const App = connect(
  (state) => ({ count: state.count }),
  { increment: incrementAction, decrement: decrementAction }
)(App);

1. Error boundry
2. Authorisation and Feature toggle Hoc
3. state handling 
