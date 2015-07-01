+++
date = "2015-07-01T15:50:49+03:00"
title = "Week 10 - Surveyman"
description = "Sortable Items in TreeView"
tags = ["react", "surveyman"]
+++

After a fun and productive two weeks at home, I have now rejoined office back in Kuwait. As all good things in life, the vacation has come to an end and it's now time to head back to the usual humdrum of 9 to 5. What also didn't help was the fact that since most of easy (low hanging fruits, if you will) features had already been built, I had no option but to start work on the feature which I most dreaded - [implementing sortable on blocks / questions](https://github.com/prakhar1989/react-surveyman/issues/3).

The primary idea behind this feature is to allow users to reorder questions and blocks in the survey. Instead of manipulating the survey directly (which can be arbitrarily long) the user interacts with the minimap (or the treeview) and the changes are reflected in the survey when the drag-and-drop is over.

Since this feature was particularly hard to tackle I decide to chalk out a rough plan on what are the *sub-problems* that I need to solve in order to ship this feature. The [github issue](https://github.com/prakhar1989/react-surveyman/issues/3) lays this out quite clearly. To begin with, I thought long and hard on what this feature and why this is required. I then broke this down into tasks or `todos` which I could tackle one by one. This was done primarily so that I stop feeling overwhelmed and just concentrate on the task at hand.

I've been tagging commits very religiously in this project so the best way to understand the code would be to checkout the commits tagged in the issue above. Piece by piece it'll start to make sense. In the remaining part of this blog post I quickly touch upon two key things that I struggled with and how I found a solution.

The first issue that I spent quite a long time breaking my head had to do with drag-and-drop. The initial drag and drop that I implemented was not behaving at all like the [version](http://gaearon.github.io/react-dnd/examples-sortable-simple.html) done by Dan Abramov. However, after comparing the code and spending hours seeing the DOM behavior the issue seemed to be with non-index keys passed to the React component because of which React was unable to reconcile the virtual DOM.

{{<highlight javascript >}}
// changing the value of key from index i to
<BlockNode key={i} id={block.get('id')} >

// below
<BlockNode key={block.get('id')} id={block.get('id')} >
{{</highlight >}}

The second issue was with implementing the state propagation where the idea was to allow the treeview to be manipulated and *when* the drag-and-drop operation finished *then* propogate and update the actual survey. Since the treeview recieved the json survey as a `prop` I had to create a replica of it in the local `state` and let the component re-render when the props changed. After looking around the documentation I found that there's indeed a lifecycle method that takes care of this  -

{{<highlight javascript >}}
var TreeView = React.createClass({
    propTypes: {
        survey: React.PropTypes.instanceOf(List)
    },
    getInitialState() {
        return {
            survey: this.props.survey,
            finalIndex: -1
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            survey: nextProps.survey,
            finalIndex: -1
        });
    },
...
{{</highlight >}}

The `finalIndex` above is used to keep track of the final location of where the item is dropped. This value is then sent to the `store` so that it can make the necessary changes. Below is the code for reordering `Blocks` for example -

{{<highlight javascript >}}
reorderBlock(draggedBlockId, overBlockId) {
    var survey = this.state.survey;
    var draggedBlockIndex = survey.findIndex(b => b.get('id') === draggedBlockId);
    var overBlockIndex = survey.findIndex(b => b.get('id') === overBlockId);

    var block = survey.get(draggedBlockIndex);
    var newSurvey = survey.delete(draggedBlockIndex).splice(overBlockIndex, 0, block);
    this.setState({
        survey: newSurvey,
        finalIndex: overBlockIndex
    });
}
{{</highlight >}}

So with that feature shipped the drag-and-drop sortable is now complete. Go and [try it out](http://prakhar.me/react-surveyman)!

Until next time!
