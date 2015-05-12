+++
date = "2015-05-10T15:50:49+03:00"
title = "Week 3 - Surveyman"
description = "Winding up the CRUD"
tags = ["react", "surveyman"]
+++

This update is coming in a bit late, especially after the week 1 and week 2 updates posted earlier. After progressing a bit on the initial setup and features I decided to take a week off Surveyman and instead wait for the GSOC results to arrive so that I could get feedback from [Emma](http://people.cs.umass.edu/~etosch/), my mentor for this project and see if I were on the right track.

Much to my delight I got selected in GSOC to work for Surveyman! To top it all, 
I was the [first ever student](http://google-opensource.blogspot.com/2015/05/gsoc-2015-stats-part-1-all-about.html) to represent Kuwait in Google Summer of Code!
  
<figure><img data-action="zoom" src="/images/gsoc_kuwait.png"></img>
	<figcaption> Kuwait's first time in GSOC! </figcaption>
</figure>

Starting last week, I decided to organize tasks as Github issues so it's easier to track progress. Having specific issues for each milestone helps me write down ideas to revisit later - this could be blog posts, github repos or other random tidbits that strike my head. Secondly, it allows me to earmark commits for that specific issue which would be useful later on. See the issue on [Immutability](https://github.com/prakhar1989/react-surveyman/issues/9) for example.

With that out of the way, let me quickly summarize the progress I made on the project. Specifically, I knocked out issues [#14](https://github.com/prakhar1989/react-surveyman/issues/14), [#13](https://github.com/prakhar1989/react-surveyman/issues/13) and [#6](https://github.com/prakhar1989/react-surveyman/issues/6) which primarily deal with adding the update and delete operations for all types. What that means is that Blocks and Questions can now be edited and deleted once they are created. 

The only challenging part, I felt, was factoring in all these controls in the UI without adding any visual clutter. Filling up the blocks / questions area with various icons didn't feel like a good solution. As a result I spent some time talking to friends and looking for inspiration in other applications. Although I did go ahead with a simple *Trash* icon for delete, the solution for editing question text turned out to be much more interesting.

<figure><img data-action="zoom" src="/images/delete_edit.png"></img>
	<figcaption> In-place editing and deletion for Questions! </figcaption>
</figure>

I started off working on [HTML5 ContentEditable](html5demos.com/contenteditable) implementation but after diving deeper and looking at some of the [issues](https://github.com/facebook/react/issues/2477) I decided to just replace the `<span>` tag with an `input` when clicked. With some React awesomeness, I was able to build this in just a few lines of code - 

{{< highlight javascript >}}
// file - js/components/Question.js

render() {
    // ...
    var input = <input type="text"
            defaultValue={this.props.qtext}
            style={{width: 200}}
            onBlur={this.handleEdit}
            onKeyPress={this.handleEdit} />;
            
    <div className="qtext-area">
        <span className="qtext" onClick={this.toggleInput}>
            { this.state.editing ? input : this.props.qtext }
        </span>
        <i className="ion-trash-b" onClick={this.handleDelete}></i>
    </div>
}, 
toggleInput() {
    this.setState({ editing: true });
},
handleEdit(e) {
    if (e.type === "blur" || 
       (e.type === "keypress" && e.key === "Enter")) {

        this.setState({ editing: false });

        // if the new value is blank do nothing
        if (e.target.value.trim() === "") {
            return; 
        }
        SurveyActions.saveEditText(e.target.value, this.props.id);
    }
}
{{< /highlight >}}

For a more complete breakdown, feel free to the browse the issues linked above and view the source code.

If you've been following closely, then you might have noticed that Options are still not editable. Well, the short answer is that while looking around for ways to factor in edit / delete in the small-sized element I came across a neat idea which eventually lead into me building a standalone [react component](http://github.com/prakhar1989/react-tags). For the long answer, wait till next week!
