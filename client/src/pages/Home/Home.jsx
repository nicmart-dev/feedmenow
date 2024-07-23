import { FormattedMessage, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const recipes = [
        {
            id: 1,
            imageAlt: 'recipe image',
            imageSrc:
                'https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            href: 'www.fakeurl.com',
            name: 'Delicious Food Name',
        },
        {
            id: 2,
            imageAlt: 'recipe image',
            imageSrc:
                'https://images.unsplash.com/photo-1670398564097-0762e1b30b3a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            href: 'www.fakeurl.com',
            name: 'Delicious Food Name',
        },
    ]

    const intl = useIntl()
    const navigate = useNavigate()

    const handleSubmitForm = (e) => {
        e.preventDefault()
        console.log('Form submitted')
        navigate('/recipes')
    }

    return (
        <>
            <div className="m-4 max-w-2xl py-8 bg-beige rounded-md p-2">
                <div className="text-left text-green">
                    <p className="mt-6 text-lg leading-8">
                        <FormattedMessage id="home.hero" />
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        <FormattedMessage id="username" />
                    </h1>
                </div>
            </div>

            <form
                className="border rounded-md p-2 m-4"
                onSubmit={handleSubmitForm}
            >
                <div className="space-y-12">
                    <div className="border-gray-900/10">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    <FormattedMessage id="home.ingredientTitle" />
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows="3"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder={intl.formatMessage({
                                            id: 'home.placeholder',
                                        })}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 m-4">
                    <button
                        type="submit"
                        className="rounded-md bg-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
                    >
                        <FormattedMessage id="home.ctaBtn" />
                    </button>
                </div>
            </form>

            <div className="m-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 border rounded-md p-2">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                alt={recipe.imageAlt}
                                src={recipe.imageSrc}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href={recipe.href}>
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                        />
                                        {recipe.name}
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
