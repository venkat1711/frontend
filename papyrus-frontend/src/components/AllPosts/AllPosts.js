import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Container, Row, Card } from "react-bootstrap";
import ImageComponent from '../dashboard/imageComponent/image';
import { Fragment } from 'react';
import moment from 'moment';
import '../../App.css';
import { API } from '../../config';
import Pagination from '@material-ui/lab/Pagination';
import { filterPosts } from '../../api/AllPosts/allposts';

const AllPosts = (props) => {
  const [page, setPage] = React.useState(1);
 //let page=1;
  const handleChange=(e,value)=>{
    //alert("cahnge"+value);
    setPage(value);
   //alert(JSON.stringify(props.location.state.values))
    search(value);
  }
  const search = (page) => {
    let body=props.location.state.values;
    body.page=page;
    filterPosts(body).then((data) => {
        if (data.error) {
           // toast.error(data.error);
            console.log(data.error);
        } else {
            props.history.push({
                pathname: '/allposts',
                state: { detail: data.data,totalPage:data.pages,values:body }
            })
           // window.location.reload(false);
            this.forceUpdate();
            setPage(page);
        }
    })
        .catch((err) => console.log(err, 'error in get all Datezone'));
}
  const allDetails = () => (
    <Container>
      <Row className="my-3">
        {props.location.state.detail.length > 0 ? (
          <div className="my-3 gridBox">
            {props.location.state.detail.map((c) => (
              <Card className='my-2' key={c._id}>
                {/* <ImageComponent item={c._id} /> */}
                <Fragment>
      <Card.Img variant="top" src={`${API}/allposts/photo/${c._id}`} onClick={() => props.history.push({
                        pathname: '/viewpost/'+c._id,
                        state: { detail: c }
                      })} className='my-2' width='100%' height='300px' style={{ objectFit: 'cover' }} />
    </Fragment>
                <Card.Body>
                  <Card.Title id='heading-wrapper'>{c.papyrusId === undefined ? '' : c.papyrusId}</Card.Title>
                  <Card.Text>
                    material :{c.material === undefined ? '' : c.material}, author :{c.author === undefined ? '' : c.author}
                  </Card.Text>
                  <Card.Text>
                    genre :{c.genre === undefined ? '' : c.genre};
                    </Card.Text>
                  <div className="mx-auto" >
                    <div onClick={() => props.history.push({
                      pathname: '/singlepost',
                      state: { detail: c }
                    })}
                      className="btn btn-outline-primary mt-2">Vedere qui</div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated at {moment(c.updatedAt).format('LLL')}</small>
                </Card.Footer>
              </Card>
            ))}
          </div>
        ) : 'no data found in records'}
      </Row>
    </Container>
  )

  return (
    <Fragment>
      {allDetails()}
      { props.location.state.totalPage>1 &&
      <div style={{ display: 'block', padding: 30 }}>
      {/* <h4>How to use Pagination Component in ReactJS?</h4> */}
      <Pagination count={props.location.state.totalPage} page={page} onChange={handleChange}/>
    </div>
}
    </Fragment>
  )
}

export default withRouter(AllPosts);
