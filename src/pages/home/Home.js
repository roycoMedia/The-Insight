import axios from "axios";
import { useState, useEffect } from "react";
import { MDBTypography } from 'mdb-react-ui-kit'
import { Container, Row, Col } from 'react-bootstrap'
import { toast } from "react-toastify";
import Blogs from "../../components/blogs/Blogs";
import Search from "../../components/search/Search";
import Spinner from "../../components/spinner/Spinner";
import Category from "../../components/category/Category";
import LatestBlog from "../../components/latestblog/LatestBlog";
import Pagination from "../../components/pagination/Pagination";
import Hero from "../../components/hero/Hero";

const Home = () => {
    // For All Blogs
    const [data, setdata] = useState([])

    // For Latest Blog
    const [latestBlog, setlatestBlog] = useState([])

    // For Filter Search
    const [searchValue, setsearchValue] = useState('')

    // For Pagination
    const [postPerPage] = useState(6)
    const [currentPage, setcurrenPage] = useState(1)

    // For The Category
    const options = ['Travel', 'Fashion', 'Fitness', 'Sports', 'Food', 'Tech']

    
    // For Fetching Blogs
    useEffect(() => {
        loadBlogsdata()
        fetchLatestBlog()
    }, []);

    // Function For Fetching Blogs
    const loadBlogsdata = async () => {
        const response = await axios.get('http://localhost:5000/blogs')
        if(response.status === 200) {
            setdata(response.data)
        }
        else {
            toast.error('Something went wrong')
        }
    }

    // Get Current Blogs For Pagination
    const indexOfLastPost = postPerPage * currentPage
    const indexofFirstPost = indexOfLastPost - postPerPage
    const currentPost = data.slice(indexofFirstPost, indexOfLastPost)
    
    // For Changing Page
    const paginate = pageNumber => setcurrenPage(pageNumber)

    // Fetch Latest Blog
    const fetchLatestBlog = async () => {
        const totalBlog =  await axios.get('http://localhost:5000/blogs')
        const start = totalBlog.data.length - 4 // Fetch Only Four
        const end = totalBlog.data.length
        setlatestBlog(totalBlog.data.slice(start, end))

        // Alternatively
        // const response = await axios.get(`http://localhost:5000/blogs?_start=${start}&_end=${end}`)
        // if(response.status === 200) {
        //     setlatestBlog(response.data)  
        // }
        // else {
        //     toast.error('Something went wrong')
        // }
    }


    // Delete Blog
    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete the blog'))  {
            const response = await axios.delete(`http://localhost:5000/blogs/${id}`)
            if(response.status === 200) {
                toast.info('Blog deleted successfully')
                loadBlogsdata()
            }
            else{
                toast.error('Something went wrong')
            }
        }        
    }


    // For The 3Dots To Wrap Blog Description *Or You Can Use CSS As Well
    const excerpt = (str) => {
        if(str.length > 50) {
            str = str.substring(0, 50) + '...'
        }
        return str
    }


    // For Filter Search
    const onInputChange = async (e) => {
        if(!e.target.value) {
            loadBlogsdata()
        }
        setsearchValue(e.target.value)
        const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`)
        setdata(response.data)     
    }
    

    // For Filtering By Category
    const handleCategory =  async (category) => {
        const response = await axios.get(`http://localhost:5000/blogs?category=${category}`)
        if(response.status === 200) {
            setdata(response.data)
        }
        else {
            toast.error('Something Went Wrong')
        }
    }


  return (
    <div style={{background: 'rgba(173, 216, 230, 0.2)'}}>

        <Container>
            <Hero />
            <Search searchValue={searchValue} onInputChange={onInputChange} />
            <Row style={{overflow: 'hidden'}}>
                {data.length === 0 && (
                    <MDBTypography className="text-center mb-0 tag='h2' ">
                        <Spinner />
                    </MDBTypography>
                )}

                <Col md={9} sm={9}>
                    <Row>                    
                        {currentPost && currentPost.map((item, index) => <Blogs key={index} {...item} excerpt={excerpt} handleDelete={handleDelete} />)}  
                        <Pagination postPerPage={postPerPage} totalPosts={data.length} paginate={paginate} />
                    </Row>                    
                </Col>

                <Col md={3} sm={3}>
                    <h4>Latest Post</h4>
                    {latestBlog && latestBlog.map((item) => <LatestBlog key={item.id} {...item} />)}
                    <Category options={options} handleCategory={handleCategory}/>
                </Col>
            </Row>
        </Container>   
    </div>
  );
}

export default Home;