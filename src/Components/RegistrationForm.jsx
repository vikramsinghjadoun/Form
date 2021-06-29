import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './Form.css';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
    md: {
      span: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// const getLocalDetails = () => {
//   let emps = localStorage.getItem('emp');
//   console.log(emps);

//   if (emps) {
//     return JSON.parse(localStorage.getItem('emp'));
//   } else {
//     return [];
//   }
// };
const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value='91'>+91</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const [user, setUser] = useState({
    email: '',
    password: '',
    cpassword: '',
    nickname: '',
    phone: '',
    website: '',
    gender: '',
    agreement: '',
  });

  console.log(user);

  const [userDetail, setUserDetail] = useState([]);
  // const [userDetail, setUserDetail] = useState(getLocalDetails());
  console.log(userDetail);
  console.log(user);
  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  const inputEvent = e => {
    const { name, value } = e.target;

    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(userDetail);

    console.log(user);
    const newUser = {
      ...user,
      id: new Date().getTime().toString(),
    };
    setUserDetail([...userDetail, newUser]);
    setUser({
      email: '',
      password: '',
      cpassword: '',
      nickname: '',
      phone: '',
      website: '',
      gender: '',
      agreement: '',
    });
  };

  useEffect(() => {
    localStorage.setItem('emp', JSON.stringify(userDetail));
  }, [userDetail]);
  useEffect(() => {
    const data = localStorage.getItem('data');

    if (data) {
      setUserDetail(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(userDetail));
  });

  return (
    <div className='set'>
      <h1 className='heading'>Registration Form</h1>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        initialValues={{
          prefix: '91',
        }}
        scrollToFirstError
      >
        <Form.Item
          name='email'
          label='E-mail'
          value={user.email}
          onChange={inputEvent}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input
            name='email'
            label='E-mail'
            value={user.email}
            onChange={inputEvent}
          />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          value={user.password}
          onChange={inputEvent}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name='password'
            label='Password'
            value={user.password}
            onChange={inputEvent}
          />
        </Form.Item>

        <Form.Item
          name='cpassword'
          label='Confirm Password'
          value={user.cpassword}
          onChange={inputEvent}
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            name='cpassword'
            label='cpassword Password'
            value={user.cpassword}
            onChange={inputEvent}
          />
        </Form.Item>

        <Form.Item
          name='nickname'
          label='Nickname'
          value={user.nickname}
          onChange={inputEvent}
          tooltip='What do you want others to call you?'
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input
            name='nickname'
            label='Nickname'
            value={user.nickname}
            onChange={inputEvent}
          />
        </Form.Item>

        <Form.Item
          name='phone'
          label='Phone Number'
          value={user.phone}
          onChange={inputEvent}
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            name='phone'
            label='Phone Number'
            value={user.phone}
            onChange={inputEvent}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name='website'
          label='Website'
          value={user.website}
          onChange={inputEvent}
          rules={[
            {
              required: true,
              message: 'Please input website!',
            },
          ]}
        >
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder='website'
          >
            <Input
              name='website'
              label='Website'
              value={user.website}
              onChange={inputEvent}
            />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name='gender'
          label='Gender'
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select
            placeholder='select your gender'
            name='gender'
            label='Gender'
            value={user.gender}
          >
            <Option value='male' onChange={inputEvent}>
              Male
            </Option>
            <Option value='female' onChange={inputEvent}>
              Female
            </Option>
            <Option value='other' onChange={inputEvent}>
              Other
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Captcha'
          extra='We must make sure that your are a human.'
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name='captcha'
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the captcha you got!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name='agreement'
          value={user.agreement}
          onChange={inputEvent}
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox
            name='agreement'
            value={user.agreement}
            onChange={inputEvent}
          >
            I have read the <a href=''>agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' onClick={handleSubmit}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

ReactDOM.render(<RegistrationForm />, document.getElementById('root'));
export default RegistrationForm;
