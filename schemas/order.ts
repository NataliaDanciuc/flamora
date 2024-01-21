import { defineField } from "sanity";


const supportType = [
    {title: 'sina', value: 'sina'},
    {title: 'galerie', value: 'galerie'}
];
const prindereType = [ 
    {title: 'rejansa', value: 'rejansa'},
    {title: 'inele', value: 'inele'}
]
const order = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        defineField({
            name: 'user',
            title: 'user',
            type: 'reference',
            to: [{ type: 'user' }],
            validation: Rule => Rule.required(),

        }),
        defineField({
            name: 'product',
            title: 'product',
            type: 'reference',
            to: [{ type: 'product' }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            initialValue: 1,
            validation: Rule => Rule.required().min(1)
        }),
        defineField({
            name: 'discount',
            title: 'Discount',
            type: 'number',
            initialValue: 0,
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: 'totalPrice',
            title: 'Total Price',
            type: 'number',
           
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'unitPrice',
            title: 'Unit Price',
            type: 'number',
           
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'height',
            title: 'Height (cm)',
            type: "number",
            description: "The height of the product in cm.",
            validation: Rule => Rule.min(0).max(300)

        }),
        defineField({
            name: 'width',
            title: 'Width (cm)',
            type: "number",
            description: "The width of the product in cm.",
            validation: Rule => Rule.min(0).max(300)
        }),
        defineField({
            name: 'supportType',
            title: 'Support Type',
            type: 'string',
            options: {
                list: supportType
            },
            initialValue: 'sina'
        }),
        defineField({
            name: 'prindereType',
            title: 'Prindere Type',
            type: 'string',
            options: {
                list: prindereType
            },
            initialValue: 'rejansa'
        }),


        
          
          

        
      
    ],
};

export default order;