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

**6.Give 3 examples of the HOC pattern.**
**Answer**
- HOC is a component which takes the function as an argument and returns the new compnent wrapping the original component .
eg:

const App = connect(
  (state) => ({ count: state.count }),
  { increment: incrementAction, decrement: decrementAction }
)(App);

1. Error boundry- const ErrorBoundaryWrappedComponent = ErrorBoundary(SomeComponent)
2. Authorisation and Feature toggle Hoc - const FeatureEnabledComponent = withFeatureToggle(MyComponent, 'newFeature') here hoc takes wrapped componet and feature flag for toggle similary for authorizatioh
const AuthorizedComponent = withAuthorization(MyComponent, ['user'])
hoc takes wrapped component and uthorisation role
3. state handling

**7. What's the difference in handling exceptions in promises, callbacks
and async...await?**
**Answer**
- promises:  are those object which executes the async operation .Promis object have 3 states  pending, fullfilled and reject

promiseFunction()
  .then(result => {
    // Success
    console.log(result);
  })
  .catch(error => {
    // Error handling
    console.error(error);
  });

  - Callbacks : is a function passed as an argument to another function.

callbackFunction((error, result) => {
  if (error) {
    // Error handling
    console.error(error);
  } else {
    // Success
    console.log(result);
  }
});

- Async await :  is use to execute async call withing try catch blocks to handle errors.

async function asyncFunction() {
  try {
    const result = await someAsyncOperation();
    // Success
    console.log(result);
  } catch (error) {
    // Error handling
    console.error(error);
  }
}
myAsyncFunction();

major difference between 3 is  promises & aync await have more cleaner code and easily readable, whereas in callbacks there are chances to be stucked in callback hell issues.

**8. How many arguments does setState take and why is it async.**
**Answer**
setstate has 2 argument, 1st one is the state variable value, and second is callback function.
Its async may be to avoid unnecessary rerendring and better user experience and performance.


**9. List the steps needed to migrate a Class to Function Component.**
**Answer**
1. remove class declaration and component import from the file
2. convert the class componnet to const abc =(props)>{} functional component syntacx
3. update the this.state value by using Usestate
4. remove this within the file
5. update the lifecycle methods by using useEffect as per the scenarios
6. update the event handler by const handleClick = () => { }

**10.List a few ways styles can be used with components.**
**Answer**
1.Inline styling
2.className styling 
3.css module styling
4.styled-components
5.global styling

**11. How to render an HTML string coming from the server.**
**Answer**
By using dangerouslySetInnerHTML- is a property that you can use on HTML elements in a React application to programmatically set their content
so 


const App = () => {
  const data = 'lorem <b>ipsum</b>';

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

export default App;

this will render correct output
