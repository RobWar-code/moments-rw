import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
    try {

    }
    catch (err) {
        const {data} = await axiosReq.get(request.next)
        setResource(prevResource => ({
                ...prevResource,
                next: data.next,
                // Eliminates duplicates that may have arisen by dynamic changes to the dataset
                results: data.results.reduce((acc, cur) => {
                    return acc.some(accResult => accResult.id === cur.id) ? acc: [...acc, cur]
                }, prevResource.results)
            })
        )
    }
}