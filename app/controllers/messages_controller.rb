class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    @groups = current_user.groups.includes(:messages).order("messages.created_at desc")

    respond_to do |format|
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージを送信しました。'  }
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      @groups = current_user.groups.includes(:messages).order("messages.created_at desc")
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    user_authorized?(@group)
  end

  def user_authorized?(group)
    member_ids = []
    group.members.each do |member|
      member_ids << member.user_id
    end

    redirect_to root_path, alert: "あなたには権限がありません" unless member_ids.include?(current_user.id)
  end

end
