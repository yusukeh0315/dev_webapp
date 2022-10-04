import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TextField from "@mui/material/TextField"
import axios from "axios"
import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

axios.defaults.withCredentials = true

const Registration = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         flaskAppIp
  //       }
  //     }
  //   }
  // `)

  const [members, setMembers] = useState()
  const [reload, setReload] = useState(false)
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [age, setAge] = useState()
  const [comment, setComment] = useState()
  const [mode, setMode] = useState("create")

  // 環境変数から接続先のWebAppを取得
  // const baseUrl = data.site.siteMetadata.flaskAppIp
  const baseUrl = "https://vitworks.xsrv.jp/dev/flask/index.cgi"
  const load_members_url = baseUrl + "/load_members"
  const delete_member_url = baseUrl + "/delete_member"
  const create_member_url = baseUrl + "/create_member"
  const update_member_url = baseUrl + "/update_member"

  // 初回読み込み時とreloadが変更となった場合にメンバー一覧を取得
  useEffect(() => {
    function fetchData() {
      axios
        .get(load_members_url)
        .then(function (response) {
          if (response.status === 200) {
            setMembers(response.data.result)
          } else {
            console.log(response)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    fetchData()
  }, [reload])

  // 新規作成と更新処理
  const handleSubmit = event => {
    event.preventDefault()

    // formのボタンの内容を取得
    const submitType = event.currentTarget.querySelector(
      "form > div > button"
    ).innerHTML

    let postUrl = ""
    let value = ""

    if (submitType === "作成") {
      postUrl = create_member_url
      value = {
        name: name,
        age: age,
        comment: comment,
      }
    } else if (submitType === "更新") {
      postUrl = update_member_url
      value = {
        id: id,
        name: name,
        age: age,
        comment: comment,
      }
    }

    axios
      .post(postUrl, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response)
          setReload(!reload)
          reset()
        } else {
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // 削除処理
  const deleteMember = delete_id => {
    const value = {
      id: delete_id,
    }

    axios
      .post(delete_member_url, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response)
          setReload(!reload)
        } else {
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const setUpdate = member => {
    // 更新対象のメンバの情報をフォームにセットする
    setId(member.id)
    setMode("modify")
    setName(member.name)
    setAge(member.age)
    setComment(member.comment)
  }

  // フォームのリセット
  const reset = () => {
    setMode("create")
    setId("")
    setName("")
    setAge("")
    setComment("")
  }

  return (
    <>
      <Layout>
        <Seo pagetitle="Registration" />
        <h1>Registration</h1>
        {/* 新規登録フォーム */}
        <form onSubmit={handleSubmit}>
          <div>
            <div className="p-contact__item">
              <TextField
                id="standard-basic"
                label="氏名"
                variant="standard"
                name="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div className="p-contact__item">
              <TextField
                id="standard-basic"
                label="年齢"
                variant="standard"
                type="number"
                name="age"
                value={age}
                onChange={event => setAge(event.target.value)}
              />
            </div>
            <div className="p-contact__item">
              <TextField
                id="standard-basic"
                label="コメント"
                variant="standard"
                type="text"
                name="comment"
                value={comment}
                onChange={event => setComment(event.target.value)}
              />
            </div>
            {mode === "create" ? (
              <button type="submit">作成</button>
            ) : (
              <>
                <button type="submit">更新</button>
                <button type="button" onClick={reset}>
                  キャンセル
                </button>
              </>
            )}
          </div>
        </form>

        <div style={{ maxWidth: "1000px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Comment</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {members?.map(member => (
                <TableRow
                  key={member.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <div onClick={() => setUpdate(member)}>{member.name}</div>
                  </TableCell>
                  <TableCell align="right">{member.age}</TableCell>
                  <TableCell align="right">{member.comment}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => deleteMember(member.id)}>
                      削除
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Layout>
    </>
  )
}

export default Registration
