import { render, screen } from '@testing-library/react';
import App from './App';
// import request from "supertest";
// import server  from "./app";
// import assert  from "assert";

// describe('Server', ()=>{
//   it('Should return .....',(done)=>{
//       request(server)
//       .get('/')
//       .expect('Content-Type','/html/')
//       .end((err,res)=>{
//           assert(res.text.includes('Home'),'Has expected title')
//       })
//       done();
//   })
// })

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

