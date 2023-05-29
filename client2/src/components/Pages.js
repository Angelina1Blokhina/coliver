import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import {Container, Pagination} from "react-bootstrap";
const Pages = observer(()=>{
    const {ad} = useContext(Context)
    const pageCount = Math.ceil(ad.totalCount / ad.limit)
    const pages = []

    /* for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    console.log('pages', pages) */
    return (
        <Container>
            <Container>
                <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={ad.page === page}
                    onClick={() => ad.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
            </Container>
        </Container>
        
    );
})

export default Pages