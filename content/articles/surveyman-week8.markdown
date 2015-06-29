+++
date = "2015-06-15T15:50:49+03:00"
title = "Week 8 - Surveyman"
description = "Simplifying adding items with cloning"
tags = ["react", "surveyman"]
+++

If you've read the previous blog post, you would be aware that I'm right now back to my home country on a *vacation*. This week has been quite hectic and filled with anxiety owing to the visa interview that I had scheduled during the start of the week. Since this was my first time appearing for a US Visa interview, I was quite in awe of how the smooth and planned the entire process was, especially compared to the other interview processes I'd been in (I'm looking at you Kuwait). Thankfully, my visa got approved and now I just can't wait for grad school to start!

So circling back to Surveyman, this week, I deployed a relatively straight forward but important [feature](https://github.com/prakhar1989/react-surveyman/issues/21) that allows users to clone or duplicate existing blocks / questions. While interacting with the survey I constantly felt that need to build similar blocks. For example, if you have a block having 3 questions and the next block that you want to add has the same number of questions in a similar configuration, building it incrementally can be exhausting.

In cases like these, which I am hoping would be quite common, a simple click that clones the entire block or question would be helpful. That was the primary motivation for building this feature. As far as writing the code goes, this feature was quite simple (at least in theory). The idea was simply deep clone the question or block object and update the survey `JSON` when required. What you would also need to ensure is to keep the two maps i.e. `OptionMap` and `QuestionMap` aware of the new items so that the mappings are in sync with the app state

The most fun I had while building this feature was working with the Immutable API. Having a brief stint with ClojureScript before, the idea of returning new collections after every mutable operation and subsequently then chaining operations was not new to me. This is how, for example, the code for cloning the `Question` looked like -


{{< highlight javascript >}}
/**
 * Returns a clone of Question with new ID of itself
 * and all options.
 * @param question - type of Immutable.Map. The question to be cloned
 */
cloneQuestion(question) {
    var self = this;
    return question
            .set('id', self.getNewId(ItemTypes.QUESTION)) // generate new ID
            .update('options', (list) =>                  // do the same for all options
                        list.map(
                            o => Immutable.Map({
                                id: self.getNewId(ItemTypes.OPTION),
                                otext: o.get('otext')
                            })
                        )
                    );
},
{{< /highlight >}}

After getting the new `clonedQuestion`, I just needed to append it to the parent container and update the relevant `OptionMap` and `QuestionMap`.

{{< highlight javascript >}}
let newQuestion = this.cloneQuestion(question);
let newSurvey = survey.updateIn([blockIndex, 'questions'], list =>
    list.splice(questionIndex + 1, 0, newQuestion)
);
// update the maps
_questionMap = _questionMap.set(qId, block.get('id'));
newQuestion.get('options').forEach( o => {
    _optionMap = _optionMap.set(o.get('id'), qId)
});
{{< /highlight >}}

Similarly, the code for adding blocks was also pretty simple. However, since it was one level up the chain what required was all child questions should be also be updated with the mappings. If you're looking at diving deeper, feel free to browse through the [commits](https://github.com/prakhar1989/react-surveyman/issues/21) tagged with this issue.

Until next time!
