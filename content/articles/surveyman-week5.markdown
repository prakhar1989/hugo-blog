+++
date = "2015-05-24T15:50:49+03:00"
title = "Week 5 - Surveyman"
description = "Finishing up Options"
tags = ["react", "surveyman"]
+++

I signed off the last post mentioning that I'll be integrating the React tags component into Surveyman which did not turn out to be difficult. As the API of the component was simple, it just meant adding the component and providing the necessary event handlers. 

The suggestions are loaded as soon as a `Question` component is dropped, which after careful thought, sounds like a practical tradeoff. Suggestions are maintained as a [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and whenever is new `Option` is added by the user, it gets appended to the set.

{{< highlight javascript >}}
// In the store:
var _optionsSet = Immutable.OrderedSet();

var SurveyStore = Reflux.createStore({
    onOptionAdded(otext) {
        // ..
        _optionsSet = _optionsSet.add(otext);
    },
    getOptionsSet() {
        return _optionSet;
    }
});
{{< /highlight >}}


On the component side, the react tags live in an overlying `Options` component.

{{< highlight javascript >}}
var Options = React.createClass({
    getInitialState() {
        return {
            suggestions: []
        }
    },
    componentDidMount() {
        var optionSet = SurveyStore.getOptionsSet();
        this.setState({ suggestions: Array.from(optionSet) });
    },
    render() {
        return (
            <ReactTags tags={options}
                suggestions={this.state.suggestions}
                handleAddition={this.handleAddition}
                handleDelete={this.handleDeletion}
                handleDrag={this.handleDrag}
                labelField={'otext'}
                placeholder={"Add new option"} />
        )
    }
    // ...
});
{{< /highlight >}}

You can view the final code [here](https://github.com/prakhar1989/react-surveyman/blob/daf4a192c952c2253634b49f015b872ba0dfa17c/js/components/Options.js).

After finishing up this by mid week, I was deciding on what issue to work on next. Although I should have run tests to prove this but it felt that rendering the entire application whenever a new option was added or removed was leading to performance bottlenecks. Since most of the data remainded unchanged most of the re-renders were useless and could be pre-emptively cancelled by the handly lifecycle function - `shouldComponentUpdate`. 

On reading up further, I found that React already provides a [mixin](https://facebook.github.io/react/docs/pure-render-mixin.html) called `PureRenderMixin` that does exactly does. 

> Under the hood, the mixin implements shouldComponentUpdate, in which it compares the current props and state with the next ones and returns false if the equalities pass.

This pattern is indeed a common way to improve performance of your React applications. The only catch though was that for this to work correctly, we needed some way to quickly do shallow checks in order to determine equality. Since all our data i.e. `questions` and `blocks` is nested this meant we could not use the mixin as it is. As recommended by the docs, this is where using Immutable collections with a library like [Immutable](http://facebook.github.io/immutable-js/) comes in handy.

So for next week, my goal will be convert all my collections into Immutable so that I can harness the power of PureRenderMixin in my app! Stay tuned for next week.


