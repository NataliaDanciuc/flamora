import { defineField } from "sanity";


const productType = [
    {title: 'perdele', value: 'perdele'},
    {title: 'draperii', value: 'draperii'},
    {title: 'accesorii', value: 'accesorii'},
];
const product ={
    name: "product",
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().max(50).error("Maximum 50 characters"),
            
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: 'name',
            },
            validation: Rule => Rule.required(),
            
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required().min(100).error("Minimum 100 characters"),
        }),
        defineField({
            name: 'specialNotes',
            title: 'Special Notes',
            type: 'text',
            validation: Rule => Rule.required().min(100).error("Minimum 100 characters"),
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(1),
        }),
        defineField({
            name: 'discount',
            title: 'Discount',
            type: 'number',
            initialValue: 0,
            validation: Rule => Rule.min(0),
        }),
        defineField({
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            validation: Rule => Rule.required().min(1),
          }),
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [
                {type: 'object', 
                fields: [
                    {name:'url', type: 'url', title: 'URL' },
                    {name:'file', type: 'file', title: 'FILE' },

                ]},
               
            ],
            validation: Rule => Rule.required().min(3).error("Minimum of 3 images requiered"),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'object',
            fields:[
                {name:'url', type: 'url', title: 'URL' },
                {name:'file', type: 'file', title: 'FILE' },
            ],
            validation: Rule => Rule.required().error("Cover image is requiered"),
        }),
        defineField({
            name: 'type',
            title: 'Product Type',
            type: 'string',
            options: {
                list: productType,
            },
            initialValue: 'perdele',
            validation: Rule => Rule.required(),

        }),
        defineField({
            name: 'isFeatured',
            title: 'Is Featured',
            type: 'boolean',
            initialValue: false,
          }),
        defineField({
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [
                {type: 'review'}
            ],
        }),
        defineField({
            name: 'height',
      title: 'Height',
      type: 'number',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document;

          // Conditionally require the height field based on the product type
          if (['perdele', 'draperii'].includes(doc?.type as string)) {
            if (typeof value !== 'number' || value <= 0 || value > 300) {
              return 'Height is required for "perdele" or "draperii" products, and it must be between 1 and 300.';
            }
          }

          return true;
        })
    })

      
       
    ],
};

export default product;