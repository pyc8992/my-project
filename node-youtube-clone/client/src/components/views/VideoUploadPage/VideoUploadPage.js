import React, {useState} from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label:'Private'},
    {value: 1, label:'Public'}
]

const CategoryOptions = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Autos & Vehicles'},
    { value: 2, label: 'Music'},
    { value: 3, label: 'Pets & Animals'},
]

function VideoUploadPage() {

    const [videoTitle, setVdeoTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoPrivate, setVideoPrivate] = useState(0);
    const [category, setCategory] = useState('Flim & Animation');
    
    const onChangeTitle = (e) => {
        setVdeoTitle(e.currentTarget.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onVideoPrivate = (e) => {
        setVideoPrivate(e.currentTarget.value);
    }

    const onChangeCategory = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);
        
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                } else{
                    alert('비디오 업로드를 실패하였습니다.');
                }
            });
    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload</Title>
            </div>
            
            <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Dropzone onDrop={onDrop} 
                     multiple={false}
                     maxSize={10000000}>{({getRootProps, getInputProps}) => (
                        <div style={{width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                    alignItems:'center', justifyContent:'center'}} {...getRootProps}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize:'3rem'}} />
                        </div>
                    )}
                    </Dropzone>
                    <div>
                        <img src alt />
                    </div>
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input onChange={onChangeTitle} value={videoTitle} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={onChangeDescription} value={description} />
                <br />
                <br />
                <select onChange={onVideoPrivate} value={videoPrivate}>
                    {
                        PrivateOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))
                    }
                </select>
                <br />
                <br />
                <select onChange={onChangeCategory} value={category}>
                    {
                        CategoryOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))
                    }
                </select>
                <br />
                <br />
                <Button type="submit" size="large" onClick>Submit</Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage