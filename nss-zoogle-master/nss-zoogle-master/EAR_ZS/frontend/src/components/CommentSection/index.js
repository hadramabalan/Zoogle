import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import { Button, Form, FormGroup } from 'shards-react'
import { format } from 'date-fns'

import reducer, { initialState } from './reducer'
import { fetchComments, postComment } from './actions'
import { APP_STATE } from '../../constants'

import Loader from '../../components/shared/Loader'
import TextAreaInput from '../shared/TextAreaInput'

const Container = styled.div`
  margin: 50px auto;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Comment = styled.div`
  margin: 30px 0;

  :last-child {
    margin-bottom: 80px;
  }
`

const CommentSection = ({ match }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { commentListState, comments, fetchError } = state

  const id = match.params.id

  useEffect(() => {
    fetchComments(id, dispatch)
    //TO DO: forbid access to unauthorized users
  }, [])

  return (
    <Container>
      {commentListState === APP_STATE.FETCHING && <Loader />}
      {commentListState === APP_STATE.DONE && (
        <div>
          <div>
            {comments.length > 0 &&
              comments.map(({ text, dateCreated }) => (
                <Comment key={text}>
                  <div>
                    <strong>{format(new Date(dateCreated), 'D.M YYYY')}</strong>
                  </div>
                  <div>{text}</div>
                </Comment>
              ))}
          </div>
          <Formik
            enableReinitialize
            onSubmit={values => {
              postComment(id, values, dispatch)
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <TextAreaInput name="text" />
                </FormGroup>
                <ButtonWrapper>
                  <Button type="submit" theme="secondary">
                    Post
                  </Button>
                </ButtonWrapper>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </Container>
  )
}

export default CommentSection
