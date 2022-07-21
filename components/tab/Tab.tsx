/** ****************************************************************************************
 * @설명 : Tab component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2022-06-26                              최초작성
 ********************************************************************************************/

import React, { useState } from 'react';

const Tabs = ({
	width,
	height,
	backgroundColor = '#F5F5F5',
	padding = '20px 30px',
	style = {},
	startIndex = 0,
	children,
}: {
	width: number;
	height: number;
	backgroundColor?: string;
	padding?: string;
	style?: any;
	startIndex: number;
	children: any;
}) => {
	const [tabIndex, setTabIndex] = useState(startIndex);

	return (
		<div
			className="tabs"
			style={{
				width: `${width}px`,
				height: `${height}px`,
				backgroundColor,
				padding,
				position: 'absolute',
				...style,
			}}
		>
			{React.Children.map(children, (el: any, idx: number) => {
				return React.cloneElement(el, {
					tabIndex,
					setTabIndex,
				});
			})}
		</div>
	);
};

const TabHeader = ({
	height,
	tabIndex,
	setTabIndex,
	children,
}: {
	height: number;
	tabIndex?: number;
	setTabIndex?: any;
	children: any;
}) => {
	return (
		<>
			<div
				className="tab-header"
				style={{ height: `${height}px`, display: 'flex', alignItems: 'center' }}
			>
				{React.Children.map(children, (el: any, idx: number) =>
					React.cloneElement(el, {
						active: idx === tabIndex,
						idx,
						setTabIndex,
						tabLength: children.length,
					}),
				)}
			</div>
			<div
				className="tab-indicator"
				style={{
					position: 'relative',
					width: `calc(100% / ${children.length})`,
					height: '5px',
					background: '#00ACEE',
					left: `calc(calc(100% / ${children.length}) * ${tabIndex})`,
					borderRadius: '5px',
					transition: 'all 250ms ease-in-out',
				}}
			></div>
		</>
	);
};

const Tab = ({
	active,
	idx,
	setTabIndex,
	tabLength,
	color = '#888',
	fontWeight = 700,
	fontSize = 14,
	children,
}: {
	active?: boolean;
	idx?: number;
	setTabIndex?: any;
	tabLength?: number;
	color?: string;
	fontWeight?: number;
	fontSize?: number;
	children?: any;
}) => {
	return (
		<div
			className={`${active && 'active'}`}
			style={{
				width: `calc(100% / ${tabLength})`,
				color: `${active ? '#00ACEE' : color}`,
				fontWeight,
				fontSize: `${fontSize}px`,
				textAlign: 'center',
				cursor: 'pointer',
				textTransform: 'uppercase',
				outline: 'none',
			}}
			onClick={() => setTabIndex(idx)}
		>
			{children}
		</div>
	);
};

const TabPanels = ({
	tabIndex,
	opacityEffect = false,
	children,
}: {
	tabIndex?: number;
	opacityEffect?: boolean;
	children?: any;
}) => {
	return (
		<div
			className="tab-body"
			style={{ position: 'relative', height: `calc(100% - 60px)`, padding: '10px 5px' }}
		>
			{React.Children.map(children, (el: any, idx: number) =>
				React.cloneElement(el, {
					active: idx === tabIndex,
					opacityEffect,
				}),
			)}
		</div>
	);
};

const TabPanel = ({
	active,
	opacityEffect,
	children,
}: {
	active?: boolean;
	opacityEffect?: boolean;
	children: any;
}) => {
	return (
		<div
			className={`${active && 'active'}`}
			style={{
				position: 'absolute',
				// top: `${active ? '0px' : '-200%'}`,
				opacity: active ? 1 : 0,
				marginTop: '5px',
				// transform: `${active ? 'scale(1)' : 'scale(0.9)'}`,
				transition: `${opacityEffect ? 'opacity 200ms ease-in-out 0ms' : 'none'}`,
			}}
		>
			{children}
		</div>
	);
};

export { Tabs, TabHeader, Tab, TabPanels, TabPanel };
