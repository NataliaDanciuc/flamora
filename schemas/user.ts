import { defineField } from "sanity"

const user = {
    name:"user",
    title: 'user',
    type: 'document',
    fields: [
        defineField({
            name: 'isAdmin',
            title: 'isAdmin',
            type: 'boolean',
            description: 'Check if the user is admin',
            initialValue: false,
            
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'The name of the user',
            readOnly: true,
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),
        defineField({
            name: 'emailVerified',
            type: 'datetime',
            hidden: true,
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'url',
        }),
        defineField({
            name: 'password',
            type: 'string',
            hidden: true,
        }),
        defineField({
            name: 'about',
            title: 'About',
            type: 'text',
            description: 'About the user',
        })
    ]
}

export default user