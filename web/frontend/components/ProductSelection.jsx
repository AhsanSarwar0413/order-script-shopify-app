import React, { useState } from 'react';
import {
    LegacyCard,
    ResourceList,
    Avatar,
    HorizontalStack,
    ResourceItem,
    Text,
    Layout,
    VerticalStack,
    AlphaCard,
    Button,
    Thumbnail,
} from '@shopify/polaris';
import { ResourcePicker } from '@shopify/app-bridge-react';
import { AppBridgeProvider } from './providers';



function ProductSelection() {
    const [shopProducts, setShopProducts] = useState([]);
    const [openResourcePicker, setOpenResourcePicker] = useState(false);

    const handleSelection = (resources) => {
        const ProductFromResources = resources.selection.map(product => product);
        setShopProducts(ProductFromResources);
    }

    //Product Selection Logic
    const ProductSelectionSection = !shopProducts ? (
        <>
            <Layout.Section>
                <AlphaCard>
                    <HorizontalStack align='space-between' blockAlign='center'>
                        <Text>Please select the product to configure Gift Wrap on it. </Text>
                        <Button primary onClick={() => setOpenResourcePicker(true)}>Add Product</Button>
                    </HorizontalStack>
                </AlphaCard>
            </Layout.Section>
            <AppBridgeProvider>
                <ResourcePicker
                    resourceType="Product"
                    showVariants={false}
                    open={openResourcePicker}
                    onCancel={() => setOpenResourcePicker(false)}
                    onSelection={(resources) => handleSelection(resources)}
                />
            </AppBridgeProvider>
        </>
    )
        : (
            <Layout.Section>
                <LegacyCard>
                    <VerticalStack>
                        <ResourceList
                            resourceName={{ singular: 'customer', plural: 'customers' }}
                            items={shopProducts}
                            renderItem={(item) => {
                                const { id, title, images } = item;
                                let image = '';
                                let productID = id.split('/');
                                productID = parseInt(productID[productID.length - 1]);
                                if (images.length > 0) {
                                    image = <Thumbnail source={images[0].originalSrc} alt={title} size="large" />;
                                }
                                else {
                                    image = <Thumbnail source="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg" alt={title} size="large" />;
                                }
                                return (
                                    <ResourceItem
                                        id={productID}
                                        media={image}
                                        accessibilityLabel={`View details for ${title}`}
                                    >
                                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                                            {title}
                                        </Text>
                                    </ResourceItem>
                                );
                            }}
                        />
                    </VerticalStack>
                </LegacyCard>
            </Layout.Section>
        );

    return (
        <>
            {ProductSelectionSection}
        </>
    )


}

export default ProductSelection;