import { useEffect, useState } from "react"

export default function Form() {

    // states of the form
    // 1. empty, nothing filled in or selected
    //    we will display a selection of categories <select>
    // 2. category was selected
    //    we will display a selection of activity types
    //    for the current category!
    // 3. type is selected
    //    we will display a form fit for the current type
    //    - date
    //    - description
    //    - name
    //    - distance, calories
    // 4. form has been submitted
    //    - we display "Loading..." while it is being processed
    //    - we display errors if validation fails
    //    - we reset the form to stage 1 after success

    const [formData, setFormData] = useState(
        {
            category_id: undefined,
            type_id: undefined,
            date: undefined
        }
    )

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    const loadCategories = async () => {
        const response = await fetch('https://test-api.codingbootcamp.cz/api/ac8b8a05/health/categories');
        const data = await response.json();

        setCategories(data);
    }

    const categorySelected = (event) => {
        setFormData({
            ...formData,
            category_id: event.target.value
        })
    }

    // load categories when the form is mounted
    useEffect(() => {
        loadCategories();
    }, []);

    // reload the types when the data changes
    useEffect(() => {
        if (formData.category_id) {
            // find the category in categories
            const category = categories.find(category => category.id == formData.category_id);

            // use its types
            setTypes(category.types);

            // select the first type
            setFormData({
                ...formData,
                type_id: category.types[0].id
            })
        } else {
            // if no category is selected, reset types to empty array
            setTypes([]);

            // reset the selected type
            setFormData({
                ...formData,
                type_id: undefined
            })
        }
    }, [formData.category_id])

    return (
        <div className="activity-form">

            Choose a category:<br />
            <select
                name="category_id"
                value={ formData.category_id }
                onChange={ categorySelected }
            >
                <option value="">-- no category chosen --</option>
                {
                    categories.map(category => {
                        return <option key={ category.id } value={ category.id }>{ category.name }</option>
                    })
                }
            </select>

            {
                formData.category_id
                    ? (
                        <>
                            <br />
                            <br />
                            Choose activity type:<br />
                            <select name="type_id">
                                {
                                    types.map(type => (
                                        <option key={ type.id } value={ type.id }>{ type.name }</option>
                                    ))
                                }
                            </select>

                            The selected type is { formData.type_id }
                        </>
                    )
                    : ''
            }

        </div>
    )

}