/**
 * Test block
 *
 * @package __PLUGIN_SLUG__
 * @since 1.0.0
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { Disabled, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import './style.css';

registerBlockType('__PLUGIN_SLUG__/__BLOCK_SLUG__', {
	attributes: {
		title: {
			type: 'string',
			default: __('__BLOCK_NAME__', '__PLUGIN_SLUG__'),
		},
	},
	edit(props) {
		const { attributes, setAttributes } = props;
		const blockProps = useBlockProps();
		return (
			<>
				<InspectorControls>
					<PanelBody title={__('__BLOCK_NAME__', '__PLUGIN_SLUG__')}>
						<TextControl
							label={__('Title', '__PLUGIN_SLUG__')}
							value={attributes.title}
							onChange={(value) => setAttributes({ title: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					<Disabled>
						<ServerSideRender block="__PLUGIN_SLUG__/__BLOCK_SLUG__" attributes={attributes} />
					</Disabled>
				</div>
			</>
		);
	},
});
