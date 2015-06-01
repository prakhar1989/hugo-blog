+++
date = "2015-06-01T15:50:49+03:00"
title = "Week 6 - Surveyman"
description = "Sprinkling in some Immutablity"
tags = ["react", "surveyman"]
+++

So I started this week with the primary goal of re-writing my stores and migrating them to use Immutable collections. In the last week's post, I laid out the motivation on why this is a good idea and how it will speed up the React application.

While the benefits were clear, I was still not sure on how I could implement and exploit the collections provided by [Immutable](http://facebook.github.io/immutable-js/) to my advantage. After numerous posts on [forums](https://discuss.reactjs.org/t/benefits-of-immutable-js/435), [Github issues](https://github.com/jurassix/react-immutable-render-mixin/issues/6) and IRC discussions I realized that I was looking at it from the wrong direction. 

The key idea was explained to by [Matt Greer](http://www.mattgreer.org/) whose extremely long and clear email helped me really understand the issue. With that out of the way, slowly and steadily I was able to migrate the store piece by piece to Immutable.

Initially it was a bit frustrating to keep updating nested structures using `set` but after finding the `updateIn` method, things got really good.

{{< highlight javascript >}}
// on question dropped
var index = this.getBlockIndex(questionObj.parentID);
var newSurvey = this.data.surveyData.updateIn([index, 'questions'], list =>
    list.push(newQuestion)
);
this.updateSurveyData(newSurvey, true);
{{</highlight >}}

Throughout the store, I also keep track of two maps namely, `_optionMap` and `_questionMap` which are basically mappings from the option ID to the question ID and from the question ID to the block ID respectively.

{{< highlight javascript >}}
// on question dropped - update question map with new question
var block = this.data.surveyData.get(index);
_questionMap = _questionMap.set(newQuestion.get('id'), block.get('id'));
{{</highlight >}}



### Adding Undo

After finishing up integrating Immutable and adding `PureRenderMixin` in all my components, my next goal was to quickly add a `undo` feature that would allow users to undo a destructive action.

The idea here is simple - at each stage cache the application state in a `history` object and use that to go back when the user clicks on `undo`

{{< highlight javascript >}}
// mananging history
var _history = [];

// in the store
updateSurveyData(data, cache = false) {
    if (cache) {
        _history.push({
            data        : this.data.surveyData,
            optionMap   : _optionMap.toJS(),
            questionMap : _questionMap.toJS()
        });
    }
    this.data.surveyData = data
    this.trigger(this.data);
},
{{< /highlight >}}

The other side benefit that this allowed me was to add an *undo* feature which made sure users are allowed to go back any destructive action they carry out in the UI.
To make sure only **destructive** actions are cached, the `updateSurveyData` takes an extra `cache` param which when `true` pushes the data into the history. After this, the undo operation is simple to implement.

{{< highlight javascript >}}
onUndoSurvey() {
    // retrieve cached data
    var { data, optionMap, questionMap } = _history.pop();
    _questionMap = Immutable.Map(questionMap);
    _optionMap = Immutable.Map(optionMap);
    this.updateSurveyData(data);
}
{{< /highlight >}}

That finally sums up the work that went in this week to finish two key features. With the architecture now stable, I feel much more confident in adding more features without impacting the performance. However, now that the codebase has grown to roughly ~1500 lines of code, it is high time to add a test suite so that refactoring becomes more managable and less scary.

The plan for this week, then, is to add tests and make the codebase more robust. Till next time.
