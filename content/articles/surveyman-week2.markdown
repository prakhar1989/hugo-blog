+++
date = "2015-04-13T06:58:24+03:00"
title = "Week 2 - Surveyman"
description = "React Bootstrap, Modals and Alerts"
tags = ["react", "surveyman"]
+++

After the drop targets and drag sources were configured last week, this week my primary motive was to develop a better UI for adding `Question` types. After mulling over the UI a bit, I decided to replace the existing Javascript `prompt` with a `modal` which would allow text entry and multiple radio buttons / checkboxes to configure various parts of a `Question` type.

<figure><img src="/images/surveyman-modal.png"></img>
	<figcaption> Adding a Bootstrap Modal </figcaption>
</figure>

### UI

> The key idea behind Surveyman is that by giving survey authors a way to write their surveys that steers them away from unnecessary ordering constraints, we can apply static analysis, randomization, and statistical dynamic analysis to locate survey errors and ensure the quality of responses.

The extra configuration parameters allow survey authors to modify the behavior of Surveyman. For example, if you are adding a question where you don't want your options to be displayed in a random order, checking the `ordered` checkbox ensures that Surveyman shows the options in the order in which they were added.

The other half of this is displaying these parameters in a clear way to the users. For this, I decided on using the combo of meaningful icons and tooltips to communicate this information.

<figure><img src="/images/surveyman-icons.png"></img>
	<figcaption> Icons for showing configuration </figcaption>
</figure>

### Architecture

To build this, I started off with migrating from [Skeleton](https://getskeleton.com) to [Bootstrap](https://getbootstrap.com) so that I could use the [React-Bootstrap](http://react-bootstrap.github.io) library. The motivation here was to save time by using a set of prebuilt components that can be used right off the shelf. Apart from the modal, I knew that I'd be needing an `Alert` and `Tooltip` very soon.

With that done, the next part was laying down the architecture for Modals. The key idea here was to setup an action that would be called when the question is dropped on a Block. This would then cause the store to change a piece of data, which in our case would be the `isOpen` property on the modal. The triggering of this change would then finally re-render the views. 

All this sounds simple, especially once you have a look at the [sample code](http://react-bootstrap.github.io/components.html#modals) for custom triggering a modal. But things start to get interesting once you start building the form inside the modal. How do you tag DOM elements so that you can retrieve their value when an event is called? Use [refs](https://facebook.github.io/react/docs/more-about-refs.html) silly! 

{{< highlight html >}}
<div className="form-group">
   <label htmlFor="qtext">Question Text</label>
   <input type="text" placeholder="What is value of 4 + 5?" 
      className="form-control" id="qtext" ref="qtext" />
</div>
{{< /highlight >}}

So I built a few form elements and tagged with them using refs and when I ran the application I got a cryptic error

{{< highlight javascript >}}
Uncaught Error: Invariant Violation: addComponentAsRefTo(...): Only a ReactOwner can have refs. 
{{< /highlight >}}

You can go dive deeper into the [issue](https://github.com/react-bootstrap/react-bootstrap/issues/223) but the main idea here was with the way `renderOverlay` was rendering the DOM in a different DOM Tree. As a fix, I had to create a `BaseModal` component that would then rendered inside a `renderOverlay`.

The final [component](https://github.com/prakhar1989/react-surveyman/blob/202dbd8520347e32322910834750942c43fb46e5/js/components/QuestionModal.js) looked like this -

{{< highlight javascript >}}
var BaseModal = React.createClass({
   // custom handler code
   render() {
      return <Modal />
   }
});

var QuestionModal = React.createClass({
   mixins: [OverlayMixin],
   render() {
      return <div className="static-modal"></div>
   },
   renderOverlay() {
      return (
         this.props.open ? <BaseModal parentId={this.props.parentID} /> 
                         : <div></div>
      )
   }
});


{{< /highlight >}}

The last step was simply rendering the `QuestionModal` in the `Application` component.

{{< highlight javascript >}}
// in Application component
render() {
   <QuestionModal
   isOpen={modalState.question}
   parentID={this.state.dropTargetID}/>
}
{{< /highlight >}}

The other parts of the application were quite straightforward and got done rather quickly. I did get stuck with building a self-dismissing alert box but the React IRC channel helped out quite a bit. 

If you've read this far, go ahead and take the app for a [spin](http://prakhar.me/react-surveyman). For the complete code, feel free to browse the [Github repository](https://github.com/prakhar1989/react-surveyman). 

This week my plan is to finish off in-place editing Block, Options and Questions. Stay tuned for the next post!