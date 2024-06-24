import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./perks";
import axios from "axios";

export default function PlacesPage() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photolink, setPhotoLink] = useState('');
    const [description, setDiscription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (<h2 className="text-2xl mt-4">{text}</h2>)
    }

    function inputDescription(text) {
        return (<p className="text-gray-500 text-sm">{text}</p>)
    }

    function preinput(title, description) {
        return (
            <>
                {inputHeader(title)}
                {inputDescription(description)}
            </>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post("/upload-by-link", { link: photolink })
        setAddedPhotos(prev => {
            return [...prev, filename];
        })
        setPhotoLink('');
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div className="text-left">
                    <form >
                        {preinput("Title", "Title for your place. Keep it short and catchy")}
                        <input type='text' value={title}
                            onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt"></input>
                        {preinput("Address", "Address to this place")}
                        <input type='text' value={address}
                            onChange={ev => setAddress(ev.target.value)} placeholder="Address"></input>
                        {preinput("Photos", "The more the merrier")}
                        <div className="flex gap-2">
                            <input value={photolink}
                                onChange={ev => setPhotoLink(ev.target.value)} type="text" placeholder={'Add an image using the link!!!'} />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/' + link} alt="" />
                                </div>
                            ))}
                            <button className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600"> Upload
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </button>
                        </div>
                        {preinput("Description", "Tell us more about this place!")}
                        <textarea value={description}
                            onChange={ev => setDiscription(ev.target.value)} />
                        {preinput("Perks", "Select all the perks your place offers")}
                        <Perks selected={perks} onChange={setPerks} />
                        {preinput("Extra Info", "House Rules .. etc")}
                        <textarea value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)} />
                        {preinput("Check in, Check out", "Add check in and check out time. Remember to add some time window for cleaning the room between guests")}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input value={checkIn}
                                    onChange={ev => setCheckin(ev.target.value)} placeholder="11:00 am" type="text" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input value={checkout}
                                    onChange={ev => setCheckout(ev.target.value)} placeholder="1:00 pm" type="text" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max Guests</h3>
                                <input value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)} placeholder="10" type="number" />
                            </div>
                        </div>
                        <button className="primary my-4"> Save </button>
                    </form>
                </div>
            )}

        </div>
    )
}