# Tab

Tab Component

## _Usage_

```jsx
import { Tabs, TabHeader, Tab, TabPanels, TabPanel } from '@components/index';

return (
	<Tabs width={550} height={250} startIndex={0}>
		<TabHeader height={60}>
			<Tab>Tab1</Tab>
			<Tab>Tab2</Tab>
			<Tab>Tab3</Tab>
			<Tab>Tab4</Tab>
		</TabHeader>
		<TabPanels opacityEffect={true}>
			<TabPanel>
				<h2>This is Tab1 section</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
					incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
					nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
				</p>
			</TabPanel>
			<TabPanel>
				<h2>This is Tab2 section</h2>
				<p>asldkjfeqwrjoqwiertqpowirqlwjlfdsaj;lafjdklsafdjklasdjf;asjf</p>
			</TabPanel>
			<TabPanel>
				<h2>This is Tab3 section</h2>
				<p>qewroivlkdsamoeqhgoieqwgnpoeqg</p>
			</TabPanel>
			<TabPanel>
				<h2>This is Tab4 section</h2>
				<p>amvoeqtjiqwehrqwrjlksadmflkasmdfl;sadmf</p>
			</TabPanel>
		</TabPanels>
	</Tabs>
);
```
