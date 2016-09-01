import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import { TABS, TABS_LIST, TAB, TAB_ITEM, TAB_PANEL } from '../../utilities/constants';

import Tabs from '../../components/tabs';
import Pane from '../../components/tabs/pane';


// Used in the Conditinal story
import Checkbox from '../../components/forms/checkbox';

const handleSelect = action;


/* eslint-disable react/display-name */
const getTabs = () => (
	<Tabs id="main-tabs-demo" className="custom-class-is-custom" onSelect={handleSelect('Tab from outermost Tabs clicked')}>
		<Pane label="Tab 1">
			<div>
				<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
				<p>You can use your <var>TAB</var> and <var>ARROW</var> keys to navigate around. Try it!</p>
				<p className="slds-box slds-theme--info slds-m-top--large">(You might have to hit shift+tab to put the focus onto the tab bar ;)</p>
			</div>
		</Pane>
		<Pane label="Tab 2" disabled>
			<div>
				<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</div>
		</Pane>
		<Pane label="Tab 3">
			<div>
				<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re quite spectacular.</p>
			</div>
		</Pane>
	</Tabs>
);
/* eslint-enable react/display-name */


/* eslint-disable react/display-name */
const getTabsNested = () => (
	<Tabs id="nested-tabs-demo" onSelect={handleSelect('Tab from outermost Tabs clicked')}>
		<Pane label="Tab 1">
			<div>
				<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
				<p>And they&rsquo;re amazing.</p>
			</div>
		</Pane>
		<Pane label="Tab 2" disabled>
			<div>
				<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
				<p>And they&rsquo;re also amazing.</p>
			</div>
		</Pane>
		<Pane label="Tab 3 (has children)">
			<div>
				<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
				<p>And they&rsquo;re tabceptionish.</p>

				<div className="slds-box slds-m-vertical--large">
					<Tabs selectedIndex={0} onSelect={handleSelect('Tab from nested Tabs clicked')}>
						<Pane label="Tab 1">
							<div>
								<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
								<p>And they&rsquo;re amazing.</p>
							</div>
						</Pane>
						<Pane label="Tab 2">
							<div>
								<h2 className="slds-text-heading--medium">This is my tab 2 contents!</h2>
								<p>And they&rsquo;re also amazing.</p>
							</div>
						</Pane>
						<Pane label="Tab 3 (Also has children!)">
							<div>
								<h2 className="slds-text-heading--medium">This is my tab 3 contents!</h2>
								<p>And they&rsquo;re even <em>more</em> tabceptionish.</p>
								<div className="slds-box slds-m-vertical--large">
									<Tabs selectedIndex={0}>
										<Pane label="Tab 1 (no children!)">
											<div>
												<h2 className="slds-text-heading--medium">This is my tab 1 contents!</h2>
												<p>And they&rsquo;re amazing.</p>
											</div>
										</Pane>
									</Tabs>
								</div>
							</div>
						</Pane>
					</Tabs>
				</div>
			</div>
		</Pane>
	</Tabs>
);
/* eslint-enable react/display-name */


const DemoTabsConditional = React.createClass({
	displayName: 'DemoTabsConditional',

	getInitialState () {
		return {
			showA: true,
			showB: true,
			showC: true
		};
	},

	handleCheckClicked (checked, event) {
		const state = {};
		state[event.target.name] = checked;
		this.setState(state);
	},

	handleSelectNopesOnThree (index, last) {
		if (index === 3) {
			console.log("The last Tab can not be selected because the onSelect handler returns false for this tab's index.");
			return false;
		}
	},

	render () {
		return (
			<div>

				<Checkbox
					assistiveText="Show tab A"
					checked={this.state.showA}
					onChange={this.handleCheckClicked}
					label="Show tab A"
					name="showA"
				/>

				<Checkbox
					assistiveText="Show tab B"
					checked={this.state.showB}
					onChange={this.handleCheckClicked}
					label="Show tab B"
					name="showB"
				/>

				<Checkbox
					checked={this.state.showC}
					onChange={this.handleCheckClicked}
					assistiveText="Show tab C"
					label="Show tab C"
					name="showC"
				/>


				<Tabs className="slds-m-top--large" onSelect={this.handleSelectNopesOnThree}>
					{this.state.showA && <Pane label="Tab A"><div>This is tab A</div></Pane>}
					{this.state.showB && <Pane label="Tab B"><div>This is tab B</div></Pane>}
					{this.state.showC && <Pane label="Tab C"><div>This is tab C</div></Pane>}
					<Pane label="Always No">
						<div>
							<p>
								This one can not be selected. But it <em>can</em> be shown if you hide the other tabs.
							</p>
							<p>
								This should not be taken as an example of how to be sneaky about disabling tab selection, but rather that you can <strong>do stuff</strong> when a tab is selected by sending it a custom <code>onSelect</code> function.
							</p>
						</div>
					</Pane>
				</Tabs>
			</div>
		);
	}
});


storiesOf(TABS, module)
	.addDecorator(getStory => <div className="slds-p-around--medium">{getStory()}</div>)
	.add('Base', () => getTabs())
	.add('Nested', () => getTabsNested())
	.add('Conditional', () => <DemoTabsConditional />)
	;

module.exports = getTabs;
