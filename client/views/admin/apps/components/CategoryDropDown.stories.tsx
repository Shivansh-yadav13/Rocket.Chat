import { ButtonGroup } from '@rocket.chat/fuselage';
import { Story } from '@storybook/react';
import React from 'react';

import { CategoryDropDownListProps } from '../definitions/CategoryDropdownDefinitions';
import { useCategoryDropdown } from '../hooks/useCategoryDropdown';
import CategoryDropDown from './CategoryDropDown';
import CategoryDropDownAnchor from './CategoryDropDownAnchor';
import CategoryDropDownList from './CategoryDropDownList';

export default {
	title: 'apps/components/CategoryDropDown',
	component: CategoryDropDownAnchor,
};

const testGroup: CategoryDropDownListProps['groups'] = [
	{
		items: [
			{
				id: 'all',
				label: 'All categories',
			},
		],
	},
	{
		label: 'Filter by Catergory',
		items: [
			{ id: '0', label: 'Analytics', checked: false },
			{ id: '1', label: 'Bots', checked: false },
			{ id: '2', label: 'Communication', checked: false },
			{ id: '3', label: 'Content Management', checked: false },
			{ id: '4', label: 'Customer Support', checked: false },
			{ id: '5', label: 'Design', checked: false },
			{ id: '6', label: 'Developer Tools', checked: false },
			{ id: '7', label: 'File Management', checked: false },
			{ id: '8', label: 'Finance', checked: false },
			{ id: '9', label: 'Health & Wellness', checked: false },
			{ id: '10', label: 'Human Resources', checked: false },
			{ id: '11', label: 'Marketing', checked: false },
			{ id: '12', label: 'Media & News', checked: false },
			{ id: '13', label: 'Office Management', checked: false },
			{ id: '14', label: 'Omnichannel', checked: false },
			{ id: '15', label: 'Other', checked: false },
			{ id: '16', label: 'Productivity', checked: false },
			{ id: '17', label: 'Project Management', checked: false },
			{ id: '18', label: 'Sales', checked: false },
			{ id: '19', label: 'Security & Compliance', checked: false },
			{ id: '20', label: 'Social & Fun', checked: false },
			{ id: '21', label: 'Team Culture', checked: false },
			{ id: '22', label: 'Travel', checked: false },
			{ id: '23', label: 'Voice & Video', checked: false },
		],
	},
];

export const Achor: Story = () => <CategoryDropDownAnchor />;
export const List: Story = () => {
	const [data, onSelected] = useCategoryDropdown(testGroup);

	return <CategoryDropDownList groups={data} onSelected={onSelected} />;
};

export const Default: Story = () => {
	const [data, onSelected] = useCategoryDropdown(testGroup);
	return (
		<ButtonGroup>
			<CategoryDropDown mini {...{ data, onSelected }} />
			<CategoryDropDown small {...{ data, onSelected }} />
			<CategoryDropDown {...{ data, onSelected }} />
		</ButtonGroup>
	);
};
