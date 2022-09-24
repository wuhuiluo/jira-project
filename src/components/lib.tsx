import React from 'react'
import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'

export const Row = styled.div<{
    gap?: number | boolean,
    between?: boolean,
    marginBottom?: number
}>`
    margin-bottom: ${props => props.marginBottom ? props.marginBottom + 'rem' : undefined};
    display: flex;
    align-items: center;
    justify-content: ${props => props.between ? 'space-between' : undefined};
    > * {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined}
    }
`

const FullPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

export const FullPageLoading = () => {
    return <FullPageContainer>
        <Spin size={'large'} />
    </FullPageContainer>
}

export const FullPageErrorCallBack = ({ error }: { error: Error | null }) => {
    return <FullPageContainer>
        <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    </FullPageContainer>
}